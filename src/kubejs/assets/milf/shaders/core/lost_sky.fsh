#version 150
#moj_import <embersquesting:eq_gui.glsl>

uniform vec4 U_Color = vec4(0.52, 0.55, 0.80, 0.5);
uniform vec4 U_Color2 = vec4(0.62, 0.65, 0.84, 0.38);
uniform vec4 U_SkyColor = vec4(0.106, 0.094, 0.141, 1.0);
uniform float U_Stars = 1.0;
uniform float U_Nebula = 0.6;
uniform float U_Parallax = 1.0;
uniform float U_Speed = 1.0;
uniform float U_Follow = 1.0;
uniform float U_Zoom = 1.0;
uniform float U_Breath = 0.25;
uniform float U_Glow = 1.0;
uniform float U_Drift = 1.0;
uniform float U_Sparkle = 1.0;

vec3 stars(vec2 px, float cell, float keep, float size, float t, float seed, float near) {
    vec2 g = px / cell + seed * 13.7;
    vec2 id = floor(g);
    vec2 f = fract(g);
    float h = eqHash(id + seed);
    if (h < keep) {
        return vec3(0.0);
    }
    vec2 pos = vec2(eqHash(id + 1.7), eqHash(id + 9.1)) * 0.8 + 0.1;
    vec2 d = (f - pos) * cell;
    float r2 = dot(d, d);
    float b = (h - keep) / (1.0 - keep);
    float tw = 0.55 + 0.45 * sin(t * (0.7 + 2.6 * eqHash(id + 4.4)) + 6.283 * eqHash(id + 2.2));
    float twFast = 0.5 + 0.5 * sin(t * (5.0 + 4.0 * eqHash(id + 5.1)) + 6.283 * eqHash(id + 8.8));
    tw = mix(tw, twFast, near * 0.8) * (1.0 + near * 0.9);
    float core = exp(-r2 / (size * size));
    float spike = 0.0;
    if (b > 0.75) {
        spike = (exp(-abs(d.x) * 2.2) * exp(-abs(d.y) * 0.35) + exp(-abs(d.y) * 2.2) * exp(-abs(d.x) * 0.35)) * 0.35;
    }
    vec3 tint = mix(vec3(0.70, 0.78, 1.0), vec3(1.0, 0.90, 0.75), eqHash(id + 6.3));
    return tint * (core + spike) * (0.35 + 0.65 * b) * tw;
}

float zarnitsa(vec2 px, vec2 size, float t, float seed, float period) {
    float ph = t / period + seed;
    float slot = floor(ph);
    float lt = fract(ph) * period;
    if (eqHash(vec2(slot, seed + 21.3)) > 0.6 * U_Glow) {
        return 0.0;
    }
    float delay = (period - 2.5) * eqHash(vec2(slot, seed + 22.8));
    float k = (lt - delay) / 2.5;
    if (k < 0.0 || k > 1.0) {
        return 0.0;
    }
    vec3 e = (vec3(k) - vec3(0.12, 0.32, 0.6)) / vec3(0.07, 0.1, 0.2);
    float env = exp(-e.x * e.x) + 0.7 * exp(-e.y * e.y) + 0.35 * exp(-e.z * e.z);
    vec2 c = vec2(eqHash(vec2(slot, seed + 23.1)), eqHash(vec2(slot, seed + 24.7))) * size;
    float r = size.y * (0.12 + 0.12 * eqHash(vec2(slot, seed + 25.5)));
    vec2 d = px - c;
    return exp(-dot(d, d) / (r * r)) * env;
}

void main() {
    vec2 size = eqSize();
    vec2 px = eqPixel();
    vec2 uv = px / size.y;
    vec2 m = clamp(eqMouseUv() - 0.5, -0.5, 0.5) * U_Parallax;
    float t = eqSeconds() * U_Speed;
    vec2 s = eqScroll() * U_Follow;
    float zoom = mix(1.0, eqZoom(), U_Zoom);

    vec3 col = mix(U_SkyColor.rgb, U_SkyColor.rgb * 2.2 + vec3(0.02, 0.0, 0.03), smoothstep(0.0, 1.0, uv.y));
    vec2 p = (px - s * 0.2) / (size.y * zoom) * 2.4 + m * 0.06 + vec2(t * 0.006, t * 0.002);
    vec2 q = vec2(eqFbm(p), eqFbm(p + vec2(5.2, 1.3)));
    float n = eqFbm(p + 1.7 * q + vec2(t * 0.012, -t * 0.008));
    float bd = (uv.y - 0.95 + 0.38 * uv.x * size.y / size.x) * 2.6;
    float band = exp(-bd * bd);
    float breath = 1.0 + U_Breath * sin(t * 0.31) * (0.6 + 0.4 * sin(t * 0.13 + q.y * 3.0));
    float cyc = fract(t / 150.0) * 3.0;
    float dAmt = clamp(U_Drift, 0.0, 1.0);
    float rose = (smoothstep(0.1, 0.9, cyc) - smoothstep(0.1, 0.9, cyc - 1.0)) * dAmt;
    float blue = (smoothstep(0.1, 0.9, cyc - 1.0) - smoothstep(0.1, 0.9, cyc - 2.0)) * dAmt;
    vec3 nebCol = mix(U_Color.rgb, U_Color2.rgb, smoothstep(0.3, 0.8, q.x));
    nebCol *= vec3(1.0) + rose * vec3(0.22, -0.14, -0.02) + blue * vec3(-0.16, 0.04, 0.12);
    vec3 hiCol = vec3(0.85, 0.75, 1.0) + rose * vec3(0.15, 0.01, -0.08) + blue * vec3(-0.13, 0.1, 0.0);
    float neb = smoothstep(0.30, 0.85, n) * (0.35 + 0.65 * band) * U_Nebula * breath;
    float hi = pow(max(n - 0.58, 0.0), 2.0) * band * 1.8 * U_Nebula * breath;
    col += nebCol * neb;
    col += hiCol * hi;

    float flash = zarnitsa(px, size, t, 0.0, 9.0) + zarnitsa(px, size, t, 0.61, 13.0);
    col += (nebCol * 1.4 + vec3(0.08, 0.06, 0.12)) * (neb * 1.6 + hi * 2.0) * flash;

    vec2 md = px - eqMouse();
    float near = exp(-dot(md, md) / 3600.0) * eqHover() * clamp(U_Sparkle, 0.0, 1.5);
    float keep = mix(0.95, 0.4, clamp(U_Stars, 0.0, 1.5) / 1.5);
    vec3 st = stars((px - s * 0.3) / zoom + m * 6.0, 13.0, keep, 0.55, t, 0.0, near) * 0.55;
    st += stars((px - s * 0.6) / zoom + m * 14.0, 31.0, keep - 0.07, 0.80, t, 3.0, near) * 0.85;
    st += stars((px - s) / zoom + m * 26.0, 83.0, keep, 1.15, t, 7.0, near);
    col += st;

    float vig = 1.0 - smoothstep(0.35, 1.25, length((px / size - 0.5) * vec2(1.0, 0.8)));
    col *= mix(0.55, 1.0, vig);
    col += (eqHash(gl_FragCoord.xy) - 0.5) / 255.0;
    fragColor = eqOut(vec4(col, U_SkyColor.a));
}
