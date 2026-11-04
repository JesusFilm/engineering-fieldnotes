"""Verify the source and independent review of a promoted sequence cut."""
from pathlib import Path
import hashlib, json
ROOT = Path(__file__).resolve().parent.parent
ENGINE = ("flow-engine.js", "sfx.js", "render.mjs", "preview.html")
def source_digest(topic, number, lesson):
    if lesson.get("production") == "motion-v2":
        cut = ROOT / "video" / topic / "motion-v2" / f"{number:02}"
        verification = json.loads((cut / "verification.json").read_text())
        decision = json.loads((cut.parent / "reviews" / f"{number:02}-decision.json").read_text())
        media_hash = hashlib.sha256((ROOT / "public" / lesson["src"]).read_bytes()).hexdigest()
        assert verification["sha256"] == decision["sha256"] == media_hash, f"Unverified cut: {topic}/{number}"
        assert decision["status"] == "pass" and not decision["blockers"], f"Review failed: {topic}/{number}"
        sources = verification.get("source_hashes", verification.get("sources", {}))
        assert sources, f"Missing source hashes: {topic}/{number}"
        for path, digest in sources.items():
            source = cut / path
            if path == "../../sequence/lessons.json":
                source = cut.parent / "input-lessons.json"
            assert hashlib.sha256(source.read_bytes()).hexdigest() == digest, f"Source changed: {source}"
        return hashlib.sha256((cut / "scene.js").read_bytes() + b"".join((cut / "engine" / name).read_bytes() for name in ENGINE)).hexdigest()
    scene = ROOT / f"video/{topic}/sequence/{number:02}.js"
    engine = ROOT / ("video/load-balancing/sequence/engine" if topic == "load-balancing" else "video/shared/sequence-engine")
    return hashlib.sha256(scene.read_bytes() + b"".join((engine / name).read_bytes() for name in ENGINE)).hexdigest()
