interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="md:mb-3">
      <h2 className="font-bold text-2xl lg:text-4xl">{title}</h2>
      <p className='text-sm lg:text-base'>{description}</p>
    </div>
  )
}

export default Heading