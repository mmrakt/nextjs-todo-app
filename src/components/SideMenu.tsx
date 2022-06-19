import { AddIcon } from '@chakra-ui/icons'
import React from 'react'

const SideMenu: React.VFC = () => {
  const projects = ['hoge', 'fuga', 'piyo']

  return (
    <>
      <div className="w-[300px] bg-dark-825">
        <div className="mt-10 ml-10 mr-3">
          <div className="flex p-3">
            <span>Projects</span>
            <div className="ml-auto">
              <AddIcon />
            </div>
          </div>
          <ul>
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
      </div>
    </>
  )
}

export default SideMenu
