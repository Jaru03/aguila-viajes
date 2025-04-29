interface SubtitleProps {
    children: React.ReactNode,
    className?: string
}

const Subtitle = ({children, className}: SubtitleProps) => {
  return (
    <h2 className={`${className} pl-4 border border-l-3 my-10 self-center border-primary border-y-0 border-r-0 border-solid text-xl flex items-center uppercase font-semibold`}>{children}</h2>
  )
}

export default Subtitle