import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div>
        <footer className="text-body-secondary py-5">
            <div className={`container ${styles.footer}`}>
                <p className="float-end mb-1">
                <a href="#">Ir para o topo</a>
                </p>
                <p className="mb-1"> &copy; EventRegistration - Todos os direitos reservados</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer