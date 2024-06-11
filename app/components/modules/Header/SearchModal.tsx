
import { handleCloseSearchModal } from "@/app/lib/utils/common";

const SearchModal = () => {


  const handleInputFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    event.target.classList.add('with_value')
  }
  const handleInputBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if(event.target.value){
      return
    }
     event.target.classList.remove('with_value')
  }

  return (
    <div className="search-modal">
      <button
      type="button"
       className="btn-reset search-modal__close"
        onClick={handleCloseSearchModal} />
      <h3 className="search-modal__title">
        Search products
      </h3>
      <div className="search-modal__top">
        <label className="search-modal__label">
          <input type="text" className="search-modal__input" onFocus={handleInputFocus} onBlur={handleInputBlur} />
          <span className="search-modal__floating_label">
            Product name, category, product type
          </span>
        </label>
      </div>
    </div>
  )
}

export default SearchModal;