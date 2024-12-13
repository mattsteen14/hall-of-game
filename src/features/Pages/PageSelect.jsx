import './PageSelect.css'
import { useFilterHandlers } from '../../utils/handlers';

export const PageSelect = () => {
    const { 
        currentPage,
        nextPage,
        previousPage,
        handleNextPage, 
        handlePreviousPage 
    } = useFilterHandlers();

    return (
        <div className='page-select'>
                <button onClick={handlePreviousPage} disabled={!previousPage}>{'<'} Previous Page</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={!nextPage}>Next Page {'>'} </button>
            </div>
    )
}