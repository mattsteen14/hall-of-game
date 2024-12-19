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
        <div 
        className='page-select'
        role='navigation'
        aria-label='Page Navigation'
        >
                <button 
                onClick={handlePreviousPage} 
                disabled={!previousPage} 
                role='button' 
                aria-label='Previous Page'
                title='Previous Page'
                name='Previous Page'
                className='page-select-button'
                >
                    {'<'} Previous Page
                </button>
                <span>Page {currentPage}</span>
                <button 
                onClick={handleNextPage} 
                disabled={!nextPage}
                role='button'
                aria-label='Next Page'
                title='Next Page'
                name='Next Page'
                className='page-select-button'
                >Next Page {'>'} 
                </button>
            </div>
    )
}