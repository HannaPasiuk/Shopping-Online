import { ICatalogMMenuButtonProps } from "../../../types/modules"

const CatalogMenuButton = ({
  name,
  isActive,
  handel
}: ICatalogMMenuButtonProps) => (
  <button
    className="btn-reset catalog-menu__list__item__btn"
    onClick={handel}
    style={{
      color: isActive ? '#e8e9ea' : '#777c85',
    }}
  >
    {name}
  </button>
)

export default CatalogMenuButton