import React, { useContext, useState } from "react"
import { ThemeContext } from "../context/ThemeContext";
import { FaMoon, FaSun } from 'react-icons/fa'
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from 'react-router-dom'
import axios from 'axios'


const Navbar = ({ setArticles }) => {
    const [open, setOpen] = useState(false);               //state variable for hiding or showing menu dropdown
    const { theme, setTheme } = useContext(ThemeContext);
    const links = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"]

    const handleInpChange = async (e) => {
        const search = e.target.value;
        console.log(search);
        try {
            const res = await axios.get(`https://newsapi.org/v2/top-headlines?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`)
            setArticles(res.data.articles);

        } catch (error) {
            console.log(error);

        }

    }
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    };


    return (
        <div className='fixed w-full bg-white z-10 shadow-md dark:bg-blue-900'>
            <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
                {/* logo */}
                <Link to="/">
                    <div className="md:text-2xl text-lg font-bold text-blue-600 dark:text-white cursor-pointer">
                        NewsWave
                    </div>
                </Link>


                {/* navbar links */}
                <div className="hidden md:flex space-x-6">
                    {
                        links.map((link) => {
                            return <Link to={`${link.toLowerCase()}`} key={link} className="text-gray-700 cursor-pointer dark:text-gray-200 dark:hover:text-white hover:text-blue-600 transition">
                                {link}
                            </Link>
                        })
                    }

                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="relative bg-gray-200 p-2 rounded-lg">
                        <span className="material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4">
                            search
                        </span>
                        <input onChange={handleInpChange} type="text" placeholder="search news..." className="md:pl-10 pl-7 w-30 md:w-64 outline-none focus:outline-none"></input>
                    </div>
                    <button onClick={toggleTheme} className="bg-gray-200 px-3 py-2 rounded-lg dark:bg-blue-500 dark:text-white cursor-pointer">
                        {
                            theme === "light" ? <FaMoon /> : <FaSun />
                        }

                    </button>


                    {/* mobile menu button */}
                    <button onClick={() => setOpen(!open)} className="md:hidden dark:text-gray-200">
                        {
                            open ? <HiX size={25} /> : <HiMenu size={25} />
                        }
                    </button>

                </div>
            </div>
            {/* mobile menu dropdown*/}
            {
                open && (
                    <div className="md:hidden px-4 pb-4">
                        {
                            links.map((link) => {
                                return <Link className="block py-2 text-gray-700 dark:text-gray-200 dark:hover-text-white hover:text-blue-600 transition" key={link} to={`/${link.toLowerCase()}`} onClick={() => setOpen(false)}>
                                    {link}
                                </Link>
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Navbar