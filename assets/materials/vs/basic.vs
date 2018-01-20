/**
 * 基本のVertex Shader
 * http://pixijs.download/dev/docs/core_renderers_webgl_filters_Filter.js.html#line149
**/
precision mediump float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
uniform float time;
uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;
varying vec2 vTextureCoord;
varying vec2 vFilterCoord;
varying vec4 vPos;

void main(void){
  vec4 pos = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   gl_Position = pos;
   vPos = pos;

   vFilterCoord = (filterMatrix * vec3(aTextureCoord, 1.0)).xy;
   vTextureCoord = aTextureCoord;
}
