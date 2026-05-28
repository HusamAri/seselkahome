/* Seselka Tweaks — design + motion controls
   Writes data-* attributes and CSS vars on <body>, plus window.__tweaks
   for the vanilla script (process autoplay).
*/

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": "regular",
  "autoplayProcess": true,
  "marquee": true,
  "marqueeSpeed": 48,
  "density": "breathed",
  "hero": "balanced",
  "typeScale": 1.0,
  "accent": "#B85837"
}/*EDITMODE-END*/;

function SeselkaTweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const b = document.body;
    b.dataset.motion   = t.motion;
    b.dataset.density  = t.density;
    b.dataset.hero     = t.hero;
    b.dataset.marquee  = t.marquee ? "on" : "off";
    b.style.setProperty("--tw-type-scale", String(t.typeScale));
    b.style.setProperty("--tw-marquee-dur", t.marqueeSpeed + "s");
    b.style.setProperty("--tw-accent", t.accent);

    const motionMult =
      t.motion === "subtle"    ? 0.55 :
      t.motion === "cinematic" ? 1.6  : 1.0;
    window.__tweaks = {
      autoplayProcess: t.autoplayProcess,
      motionMult,
    };
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Motion" />
      <TweakRadio
        label="Hareket"
        value={t.motion}
        options={["subtle", "regular", "cinematic"]}
        onChange={(v) => setTweak("motion", v)}
      />
      <TweakToggle
        label="Süreç otomatik oynatma"
        value={t.autoplayProcess}
        onChange={(v) => setTweak("autoplayProcess", v)}
      />
      <TweakToggle
        label="Marquee"
        value={t.marquee}
        onChange={(v) => setTweak("marquee", v)}
      />
      <TweakSlider
        label="Marquee süresi"
        value={t.marqueeSpeed}
        min={20}
        max={120}
        step={4}
        unit="s"
        onChange={(v) => setTweak("marqueeSpeed", v)}
      />

      <TweakSection label="Design" />
      <TweakRadio
        label="Yoğunluk"
        value={t.density}
        options={["compact", "breathed", "generous"]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakRadio
        label="Hero düzen"
        value={t.hero}
        options={["text-first", "balanced", "photo-first"]}
        onChange={(v) => setTweak("hero", v)}
      />
      <TweakSlider
        label="Tipografi"
        value={t.typeScale}
        min={0.85}
        max={1.20}
        step={0.05}
        unit="×"
        onChange={(v) => setTweak("typeScale", Math.round(v * 100) / 100)}
      />
      <TweakColor
        label="Vurgu"
        value={t.accent}
        options={["#B85837", "#8F4226", "#5C6E4A", "#6B5E4F"]}
        onChange={(v) => setTweak("accent", v)}
      />
    </TweaksPanel>
  );
}

/* Mount when DOM + tweaks-panel globals are ready */
(function mount() {
  if (typeof TweaksPanel === "undefined" || typeof useTweaks === "undefined") {
    return setTimeout(mount, 30);
  }
  const root = document.getElementById("tweaks-root");
  if (!root) return setTimeout(mount, 30);
  ReactDOM.createRoot(root).render(<SeselkaTweaksApp />);
})();
