<script lang="ts">
	import { isMobile } from '$lib/utils/mobile';

	let canvasRef: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null = null;

	function heartPosition(rad: number) {
		//return [Math.sin(rad), Math.cos(rad)];
		return [
			Math.pow(Math.sin(rad), 3),
			-(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))
		];
	}
	function scaleAndTranslate(pos: number[], sx: number, sy: number, dx: number, dy: number) {
		return [dx + pos[0] * sx, dy + pos[1] * sy];
	}

	$effect(() => {
		if (canvasRef) {
			context = canvasRef.getContext('2d');

			if (!context) {
				return;
			}

			let mobile = isMobile();
			var koef = mobile ? 0.5 : 1;
			var width = (canvasRef.width = koef * innerWidth);
			var height = (canvasRef.height = koef * innerHeight);
			var rand = Math.random;
			context.fillStyle = 'rgba(0,0,0,1)';
			context.fillRect(0, 0, width, height);

			window.addEventListener('resize', function () {
				if (!context) {
					return;
				}

				width = canvasRef.width = koef * innerWidth;
				height = canvasRef.height = koef * innerHeight;
				context.fillStyle = 'rgba(0,0,0,1)';
				context.fillRect(0, 0, width, height);
			});

			var traceCount = mobile ? 20 : 50;
			var pointsOrigin: number[][] = [];
			var i;
			var dr = mobile ? 0.3 : 0.1;
			for (i = 0; i < Math.PI * 2; i += dr)
				pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
			for (i = 0; i < Math.PI * 2; i += dr)
				pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
			for (i = 0; i < Math.PI * 2; i += dr)
				pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
			var heartPointsCount = pointsOrigin.length;

			var targetPoints: number[][] = [];
			var pulse = function (kx: number, ky: number) {
				for (i = 0; i < pointsOrigin.length; i++) {
					targetPoints[i] = [];
					targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
					targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
				}
			};

			var e: {
				vx: number;
				vy: number;
				R: number;
				speed: number;
				q: number;
				D: number;
				force: number;
				f: string;
				trace: { x: number; y: number }[];
			}[] = [];
			for (i = 0; i < heartPointsCount; i++) {
				var x = rand() * width;
				var y = rand() * height;
				e[i] = {
					vx: 0,
					vy: 0,
					R: 2,
					speed: rand() + 5,
					q: ~~(rand() * heartPointsCount),
					D: 2 * (i % 2) - 1,
					force: 0.2 * rand() + 0.7,
					f: 'hsla(0,' + ~~(40 * rand() + 60) + '%,' + ~~(60 * rand() + 20) + '%,.3)',
					trace: []
				};
				for (var k = 0; k < traceCount; k++) e[i].trace.push({ x: x, y: y });
			}

			var config = {
				traceK: 0.4,
				timeDelta: 0.1
			};

			let time = 0;
			var loop = function () {
				if (!context) {
					return;
				}

				var n = -Math.cos(time);
				pulse((1 + n) * 0.5, (1 + n) * 0.5);
				time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;
				context.fillStyle = 'rgba(0,0,0,.1)';
				context.fillRect(0, 0, width, height);
				for (i = e.length; i--; ) {
					var u = e[i];
					var q = targetPoints[u.q];
					var dx = u.trace[0].x - q[0];
					var dy = u.trace[0].y - q[1];
					var length = Math.sqrt(dx * dx + dy * dy);
					if (10 > length) {
						if (0.95 < rand()) {
							u.q = ~~(rand() * heartPointsCount);
						} else {
							if (0.99 < rand()) {
								u.D *= -1;
							}
							u.q += u.D;
							u.q %= heartPointsCount;
							if (0 > u.q) {
								u.q += heartPointsCount;
							}
						}
					}
					u.vx += (-dx / length) * u.speed;
					u.vy += (-dy / length) * u.speed;
					u.trace[0].x += u.vx;
					u.trace[0].y += u.vy;
					u.vx *= u.force;
					u.vy *= u.force;
					for (k = 0; k < u.trace.length - 1; ) {
						var T = u.trace[k];
						var N = u.trace[++k];
						N.x -= config.traceK * (N.x - T.x);
						N.y -= config.traceK * (N.y - T.y);
					}
					context.fillStyle = u.f;
					for (k = 0; k < u.trace.length; k++) {
						context.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
					}
				}

				window.requestAnimationFrame(loop);
			};
			loop();
		}
	});
</script>

<canvas id="heart" bind:this={canvasRef}></canvas>
