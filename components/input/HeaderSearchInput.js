import { FiSearch } from 'react-icons/fi'
import NavBrand from '../header/Navbrand'
const HeaderSearchInput = ({
    onChange,
    onKeyUp,
    value,
}) => {
    return (
        <label className="px-4 py-3  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 flex-grow rounded flex gap-4 items-center cursor-text">
                        <NavBrand />
            <input
                type="search"
                className="flex-grow focus:outline-none text-sm text-white placeholder:text-white bg-transparent w-12"
                placeholder="Search Image"
                onChange={onChange}
                onKeyUp={onKeyUp}
                value={value}
            />
        </label>
    )
}

export default HeaderSearchInput