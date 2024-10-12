interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="md:mb-3">
      <h2 className="font-bold text-2xl lg:text-4xl">{title}</h2>
      <p className='text-sm lg:text-base text-foreground/50'>{description}</p>
    </div>
  )
}

export default Heading