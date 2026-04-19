interface Props {
  title: string;
  subtitle?: string;
  englishTitle?: string;
}

export default function PageHeader({ title, subtitle, englishTitle }: Props) {
  return (
    <div className="bg-gradient-to-r from-secondary/60 via-primary/20 to-secondary/40 py-12 md:py-16">
      <div className="page-container text-center">
        {englishTitle && (
          <p className="text-xs md:text-sm font-body text-accent/60 tracking-widest uppercase mb-2">
            {englishTitle}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm md:text-base text-charcoal/60 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-0.5 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  );
}
