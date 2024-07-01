export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full min-h-screen">
			{/* Ajustamos el tamaño de fondo y posición para que la imagen se alargue y se mantenga en la parte superior */}
			<div className="absolute top-0 left-0 w-full h-1/5 bg-[url('/wave1.svg')] bg-[length:auto] bg-top bg-repeat-x z-0 opacity-40" />
			<div className="absolute top-0 left-0 w-full h-1/5 bg-[url('/wave2.svg')] bg-[length:auto] bg-top bg-repeat-x z-0 opacity-60" />
			<div className="relative z-10 inline-block max-w-lg text-center">
				{children}
			</div>
		</section>
	);
}
