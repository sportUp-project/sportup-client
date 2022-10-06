import './AboutPage.css'
export default function AboutPage(props) {

  return (
    <div className="about-holder">
      <section className="creator-holder">
        <h3>Pavel Popov</h3>
        <img src='https://res.cloudinary.com/dxc2oj7lt/image/upload/v1664887616/sportUp-users-gallery/gxzye5vhjmvkus7kn7mu.jpg' alt="" />
        <p>Hi guys this is my description Lorem ipsum dolor sit amet consectetur adipisicing elit. In tempora officia possimus fuga, itaque ullam rerum dolorem quo deleniti! Dolores tempore perspiciatis voluptate sed quia sint sunt, porro ipsa qui.</p>
        <span>Links:</span>
        <a href="https://linkedin.com/pavel-iv-popov">Linked in</a>
        <a href="https://github.com/veykos">GitHub</a>
      </section>
      <section className="creator-holder">
        <h3>Joanna Zielinska</h3>
        <img src="" alt="" />
        <p>Hi guys this is my description Lorem ipsum dolor sit amet consectetur adipisicing elit. In tempora officia possimus fuga, itaque ullam rerum dolorem quo deleniti! Dolores tempore perspiciatis voluptate sed quia sint sunt, porro ipsa qui.</p>
        <p>Links:</p>
        <a href="https://linkedin.com/pavel-iv-popov">Linked in</a>
        <a href="https://github.com/veykos">GitHub</a>
      </section>
    </div>
  )
}