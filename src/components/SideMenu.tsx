import React from 'react'

const SideMenu: React.VFC = () => {
  const projects = ['hoge', 'fuga', 'piyo']

  return (
    <>
      <div className="w-[300px] bg-dark-825">
        <ul className="mt-10 ml-10 mr-3">
          {projects.map((project) => (
            <li
              key={project}
              className="hover:bg-dark-700 p-3 rounded-md text-lg"
            >
              {project}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SideMenu
