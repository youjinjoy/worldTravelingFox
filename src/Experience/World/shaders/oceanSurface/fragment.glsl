uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying vec2 vUv;
varying float vElevation;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
 
    // 원 모양의 알파 마스크 적용
    float distFromCenter = distance(vUv, vec2(0.5, 0.5));
    float alpha = 1.0 - smoothstep(0.48, 0.5, distFromCenter); // 원 모양의 알파 마스크

    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
}