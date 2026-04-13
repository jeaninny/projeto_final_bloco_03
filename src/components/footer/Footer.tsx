import { EnvelopeIcon, GithubLogoIcon, GlobeIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">
                        Farmácia - Desenvolvido por Jeaninny Teixeira | Copyright: {data}
                    </p>
                    <p className="text-lg"> Redes Sociais</p>
                    <div className="flex gap-2">
                        <a href="https://www.linkedin.com/in/jeaninnyteixeira" target="_blank" rel="noreferrer">
                            <LinkedinLogoIcon size={32} weight="bold" style={{ color: "#ffffff" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#93c5fd")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")} />
                        </a>
                        <a href="https://github.com/jeaninny" target="_blank" rel="noreferrer">
                            <GithubLogoIcon size={32} weight="bold" style={{ color: "#ffffff" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#93c5fd")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")} />
                        </a>
                        <a href="https://jeaninny.github.io/portfolio" target="_blank" rel="noreferrer">
                            <GlobeIcon size={32} weight="bold" style={{ color: "#ffffff" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#93c5fd")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")} />
                        </a>
                        <a href="mailto:jeaninny.teixeira@gmail.com">
                            <EnvelopeIcon size={32} weight="bold" style={{ color: "#ffffff" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#93c5fd")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer