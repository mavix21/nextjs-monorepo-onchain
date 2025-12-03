interface ArticleContentProps {
  dismissButton?: React.ReactNode;
}

export function ArticleContent({ dismissButton }: ArticleContentProps) {
  return (
    <article className="relative px-4 py-8">
      <div className="mx-auto h-48 w-full max-w-2xl rounded-lg bg-linear-to-br from-blue-500 to-purple-600" />
      {dismissButton}
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="text-2xl font-bold">
          The Rise of Minimalism: How Modern Architecture is Redefining Space
        </h1>
        <h2 className="text-muted-foreground mt-2 text-lg">
          Exploring how minimalism in architecture is transforming the way we
          design, live, and interact with spaces.
        </h2>
        <div className="text-muted-foreground mt-4 text-sm">
          by{" "}
          <span className="text-foreground font-medium">Frederik Hansen</span>
        </div>
        <section className="mt-6 space-y-4">
          <p>
            Minimalism in architecture has evolved far beyond a simple design
            trend. Today, it is a defining philosophy that shapes how we
            conceive, create, and inhabit our spaces. The sleek lines, open
            plans, and functional designs that characterize minimalist
            architecture represent a shift toward a more intentional, thoughtful
            use of space.
          </p>
          <p>
            In its early stages, minimalism was driven by modernist principles,
            particularly those of the Bauhaus movement, which sought to
            eliminate ornamentation and focus on functional beauty. Architects
            like Ludwig Mies van der Rohe, with his famous aphorism &quot;Less
            is more,&quot; laid the groundwork for the minimalist approach we
            recognize today.
          </p>
          <p>
            One of the key drivers behind the rise of minimalism is the desire
            for more efficient use of space. As cities become more crowded,
            space is at a premium, and the need to design smaller but more
            functional homes and offices is becoming increasingly important.
          </p>
          <p>
            Incorporating natural light and clean lines is another hallmark of
            minimalist design. These elements help to create a sense of peace
            and serenity, which is central to the minimalist philosophy. Large
            windows, often floor-to-ceiling, invite the outdoors in, connecting
            occupants with nature and enhancing the feeling of openness.
          </p>
          <p>
            The minimalist approach also encourages mindfulness in how we
            interact with our surroundings. In a world filled with distractions,
            minimalist spaces offer a reprieve—an opportunity to live more
            consciously.
          </p>
          <p>
            Finally, minimalist architecture is not just about visual
            aesthetics—it is a tool for enhancing the quality of life. The rise
            of minimalism reflects a growing recognition that our built
            environments have a profound impact on our well-being.
          </p>
        </section>
      </div>
    </article>
  );
}
