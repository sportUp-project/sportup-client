import './AboutPage.css'
export default function AboutPage(props) {

  return (
    <div className="about-holder">
      <section className="creator-holder">
        <h3>Joanna Zielinska</h3>
        <img src="" alt="" />
        <p>Hi, I'm Pavel and I'm an aspiring web developer. I moved to Berlin in August to pursue my passion for web development. Ironhack Berlin was an amazing experience for me and now I'm looking for job opportunities. Outside of programming I enjoy lifting weights, cooking and reading.</p>
        <div className="sc-holder">
        <a rel='noreferrer' target="_blank" href="https://www.linkedin.com/in/j-m-zielinska/"><img className='link-logo' src="https://res.cloudinary.com/dxc2oj7lt/image/upload/v1665059333/sportUp-users-gallery/linkedin_tscs52.png" alt="github" /></a>
        <a rel='noreferrer' target="_blank" href="https://github.com/j-zielinska"><img className='link-logo' src="https://res.cloudinary.com/dxc2oj7lt/image/upload/v1665058862/sportUp-users-gallery/github-logo_kyaxov.png" alt="github" /></a>
        
        </div>
      </section>
      <section className="creator-holder">
        <h3>Pavel Popov</h3>
        <img src='https://res.cloudinary.com/dxc2oj7lt/image/upload/v1664887616/sportUp-users-gallery/gxzye5vhjmvkus7kn7mu.jpg' alt="pavel profile" />
        <p>Hi, I'm Pavel and I'm an aspiring web developer. I moved to Berlin in August to pursue my passion for web development. Ironhack Berlin was an amazing experience for me and now I'm looking for job opportunities. Outside of programming I enjoy lifting weights, cooking and reading.</p>
        <div className="sc-holder">

        <a rel='noreferrer' target="_blank" href="https://www.linkedin.com/in/pavel-iv-popov/"><img className='link-logo' src="https://res.cloudinary.com/dxc2oj7lt/image/upload/v1665059333/sportUp-users-gallery/linkedin_tscs52.png" alt="github" /></a>
        <a rel='noreferrer' target="_blank" href="https://github.com/veykos"><img className='link-logo' src="https://res.cloudinary.com/dxc2oj7lt/image/upload/v1665058862/sportUp-users-gallery/github-logo_kyaxov.png" alt="github" /></a>
        </div>
      </section>
    </div>
  )
}