#version 330 compatibility

in vec4  vColor;
in float vLightIntensity;
in vec2  vST;

uniform bool  uSmooth;
uniform float uAd;
uniform float uBd;
uniform vec4  uSquareColor;

void
main( )
{
	float halfSize = uAd/2.;
	float Ar = uAd/2.;
	float Br = uBd/2.;
	float s = vST.s;
	float t = vST.t;
	float sp = 2. * s;		// good for spheres
	float tp = t;
	int numins = int( sp / uAd );
	int numint = int( tp / uAd );
	float scenter = float(numins)*uAd + Ar;
	float tcenter = float(numint)*uAd + Br;
	float ds = pow((sp - scenter)/Ar, 2);	// 0. <= ds <= halfSize
	float dt = pow((tp - tcenter)/Br, 2);	// 0. <= dt <= halfSize
	float maxDist = max( ds, dt  );

	gl_FragColor = vColor;		// default color
	
	if( (ds+dt) <= 1 )
	{
		
		if( uSmooth )
		{
			
			float t = smoothstep( halfSize-uBd, halfSize+uBd, maxDist );
			gl_FragColor = mix( uSquareColor, vColor, t );
		}
		else
		{
			gl_FragColor = uSquareColor;
		}
		
	}
	
	gl_FragColor.rgb *= vLightIntensity;	// apply lighting model
}
