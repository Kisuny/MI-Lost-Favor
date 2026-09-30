#version 150

uniform sampler2D DiffuseSampler;
uniform float Intensity;
uniform float Time;
uniform float BlockSize;

in vec2 texCoord;
out vec4 fragColor;

//Highly inspired by DaFaqs's noise_edge shader, so ty <3
//https://github.com/DaFuqs/Spectrum/blob/1.21.1-neoforge/src/main/resources/assets/spectrum/shaders/program/noise_edge.fsh

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec4 base = texture(DiffuseSampler, texCoord);

    ivec2 size = textureSize(DiffuseSampler, 0);
    vec2 screenSize = vec2(size);

    vec2 center = texCoord - 0.5;
    float dist = length(center);

    vec2 pixel = texCoord * screenSize;
    vec2 block = floor(pixel / BlockSize);
    vec2 blockUV = block / (screenSize / BlockSize);

    float pull = noise(blockUV * 7.0 + Time * 0.6 + vec2(1.2, 3.4)) * 0.5;
    float distortedDist = dist - pull;

    float t = clamp(Intensity / 2.5, 0.0, 1.0);


    float edge0 = mix(0.0, -0.5, t);
    float edge1 = mix(0.15, -0.5 + 0.0001, t);

    float edge = smoothstep(edge0, edge1, distortedDist);

    float n = noise(blockUV * 500.0 + Time * 5.0 + vec2(1.23, 4.56));

    float blendFactor = min(edge * Intensity, 1.0);

    vec3 rgb = mix(base.rgb, vec3(n), blendFactor);

    fragColor = vec4(rgb, base.a);
}