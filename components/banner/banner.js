const Banner = ({ children }) => {
    return (
        <div
            className={`w-full h-[600px] bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat`}
        >
            <div className="w-full h-full flex justify-center items-center px-7">
                <div className="flex flex-col gap-6 w-full max-w-[600px]">{children}</div>
            </div>
        </div>
    )
}

export default Banner