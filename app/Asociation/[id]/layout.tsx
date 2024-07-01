export default function AboutLayout({
	children,
  }: {
	children: React.ReactNode;
  }) {
	return (
	  <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full min-h-screen">
		<div className="absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-[#3E87D2] to-[#d8ebff] z-0" />
		<div className="relative z-10 inline-block max-w-lg text-center">
		  {children}
		</div>
	  </section>
	);
  }
  
  
  