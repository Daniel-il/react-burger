
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { deleteConstructorIngredients } from "../../services/actions/burger-constructor"
import { useDispatch } from "react-redux"
import { useDrag, useDrop } from "react-dnd"
import fillingStyle from './constructor-filling.module.css'
import { useRef } from "react";
import { reorderIngredient } from "../../services/actions/burger-constructor"
export default function ConstructorFilling ({ingredient, id, index}) {
  const dispatch = useDispatch();
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    type: 'sort_ingredient',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop({
    accept: 'sort_ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
     
      dispatch(reorderIngredient(hoverIndex, dragIndex))
      item.index = hoverIndex
    },
  })
  const opacity = isDragging ? 0 : 1
  
  drag(drop(ref))


        return (
        <li className={`${fillingStyle.item}`} ref={ref} data-handler-id={handlerId} style = {{opacity}} draggable>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {dispatch(deleteConstructorIngredients(ingredient, id))}}
        />
      </li>
    )
}