export default function SectionTitle({ children }) {
    return (
        <h2 className="mb-7 text-[clamp(1.75rem,6vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.035em] text-white after:mt-4 after:block after:h-1 after:w-14 after:rounded-full after:bg-accent after:content-['']">
            {children}
        </h2>
    );
}
