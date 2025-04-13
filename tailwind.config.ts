
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				terminal: {
					dark: '#1A1F2C',
					green: '#00FF00',
					purple: '#6A0DAD',
					gray: '#8E9196',
					white: '#FFFFFF',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				mono: ['Fira Code', 'VT323', 'ui-monospace', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-5px, 5px)' },
					'40%': { transform: 'translate(-5px, -5px)' },
					'60%': { transform: 'translate(5px, 5px)' },
					'80%': { transform: 'translate(5px, -5px)' },
					'100%': { transform: 'translate(0)' }
				},
				'scanline': {
					'0%': { transform: 'translateY(0%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'blink': {
					'0%': { opacity: '1' },
					'50%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'flicker': {
					'0%': { opacity: '0.27861' },
					'5%': { opacity: '0.34769' },
					'10%': { opacity: '0.23604' },
					'15%': { opacity: '0.90626' },
					'20%': { opacity: '0.18128' },
					'25%': { opacity: '0.83891' },
					'30%': { opacity: '0.65583' },
					'35%': { opacity: '0.67807' },
					'40%': { opacity: '0.26559' },
					'45%': { opacity: '0.84693' },
					'50%': { opacity: '0.96019' },
					'55%': { opacity: '0.08594' },
					'60%': { opacity: '0.20313' },
					'65%': { opacity: '0.71988' },
					'70%': { opacity: '0.53455' },
					'75%': { opacity: '0.37288' },
					'80%': { opacity: '0.71428' },
					'85%': { opacity: '0.70419' },
					'90%': { opacity: '0.7003' },
					'95%': { opacity: '0.36108' },
					'100%': { opacity: '0.24387' }
				},
				'textGlitch': {
					'0%': { textShadow: '0.05em 0 0 #00FF00, -0.05em -0.025em 0 #6A0DAD' },
					'25%': { textShadow: '0.05em 0 0 #00FF00, -0.05em -0.025em 0 #6A0DAD' },
					'26%': { textShadow: '0.05em 0 0 #6A0DAD, -0.05em -0.025em 0 #00FF00' },
					'50%': { textShadow: '0.05em 0 0 #6A0DAD, -0.05em -0.025em 0 #00FF00' },
					'51%': { textShadow: '0.05em 0 0 #00FF00, -0.05em -0.025em 0 #6A0DAD' },
					'75%': { textShadow: '0.05em 0 0 #00FF00, -0.05em -0.025em 0 #6A0DAD' },
					'76%': { textShadow: '0.05em 0 0 #6A0DAD, -0.05em -0.025em 0 #00FF00' },
					'100%': { textShadow: '0.05em 0 0 #6A0DAD, -0.05em -0.025em 0 #00FF00' }
				},
				'confetti': {
					'0%': { 
						transform: 'translateY(-50px) rotateZ(0deg)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'translateY(1000%) rotateZ(720deg)', 
						opacity: '0' 
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.5s ease-in-out infinite',
				'scanline': 'scanline 8s linear infinite',
				'blink': 'blink 1s infinite',
				'flicker': 'flicker 0.15s infinite',
				'textGlitch': 'textGlitch 0.3s ease-in-out infinite',
				'confetti': 'confetti 3s forwards',
				'scale-in': 'scale-in 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
