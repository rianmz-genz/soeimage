const BannerCaption = ({description,title}) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-white text-5xl font-semibold">{title}</h1>
            <p className="text-white text-lg md:text-xl font-normal max-w-[400px]">
                {description}
            </p>
        </div>
    )
}

export default BannerCaption