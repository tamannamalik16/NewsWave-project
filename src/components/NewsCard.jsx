import {Link} from 'react-router-dom'

export const NewsCard = ({article}) => {
    const {source, author, title, description, url, urlToImage, publishedAt } = article;


    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 hover:scale-105 transition-all rounded-xl shadow-md overflow-hidden hover:shadow-lg duration-300">
            <img src={urlToImage} alt={title} className="w-full h-48 object-cover bg-gray-400">
            </img>
            <div className="p-4">
                <Link to={url}>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition-all">
                    {title}
                    </h2>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {description?.length > 100 ? description.slice(0, 100) + "..." : description}
                </p>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>By {author || "unknown"}</span> &nbsp;
                    <span className='text-gray-800 dark:text-gray-300'>{new Date(publishedAt).toLocaleDateString()}</span>
                </div>
                <div className='text-blue-600'>
                    Source:{source.name}
                </div>
            </div>
        </div>
    );
}