import s from './Card.module.scss'

const Card = props => {
    return (
        <div className={s.Card}>
            <p style={{maxWidth:'220px'}}>{props.children}</p>
            
        </div>
    )
}

export default Card