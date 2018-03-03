/**
 * 基本のFragment Shader
 * http://pixijs.download/dev/docs/core_renderers_webgl_filters_Filter.js.html#line175
**/

precision mediump float;

uniform float time;
varying vec2 vTextureCoord;
varying vec2 vFilterCoord;
varying vec4 vPos;
uniform sampler2D uSampler;
uniform sampler2D filterSampler;

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main(void){
  vec4 sample = texture2D(uSampler, vTextureCoord);
  vec2 pos = vPos.xy;
  float t = time * time * time / 3.0;
  float n = smoothstep(.1,.2,noise(pos*15.0) * t);
  n = clamp(n, 0.0, 1.0);
  if(.25 < n && n < .35) {
    gl_FragColor = vec4(1.0, n + .2, 0., 1.);
  }
  else if(.35 <= n && n < .65) {
    // gl_FragColor = sample * vec4(.95, n * .25, 0., 1.);
    gl_FragColor = vec4(.95, n * .25, 0., 1.);
  }
  else if(.55 <= n) {
    gl_FragColor = sample * (1. - n);
  }
  else {
    gl_FragColor = sample;
  }
}
