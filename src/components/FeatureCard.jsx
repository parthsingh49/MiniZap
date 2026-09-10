function FeatureCard({
  icon,
  title,
  description
}) {


  return (

    <div
      className="
      bg-gray-900
      border
      border-gray-800
      rounded-xl
      p-8
      hover:border-blue-500
      hover:-translate-y-2
      transition
      duration-300
      "
    >


      <div
        className="
        text-blue-500
        mb-6
        "
      >

        {icon}

      </div>



      <h3
        className="
        text-2xl
        font-semibold
        "
      >

        {title}

      </h3>



      <p
        className="
        mt-4
        text-gray-400
        leading-relaxed
        "
      >

        {description}

      </p>



    </div>

  );

}


export default FeatureCard;