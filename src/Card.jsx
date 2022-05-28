import s from './Card.module.scss'

const Card = props => {
    return (
        <div className={s.Card}>
            {props.children}
        </div>
    )
}

export default Card