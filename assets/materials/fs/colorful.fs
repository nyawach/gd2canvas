precision mediump float;

uniform float time;
varying vec4 vPos;

void main(void) {
  // rgbを計算する
  vec3 c = vec3(sin(time), cos(time *.2), .4);

  vec4 color = vec4(vPos.x- c.x, vPos.y - c.y, c.z, 0.0);

  // 最終的な色の計算は↓で入れていく
  gl_FragColor = color;
}
