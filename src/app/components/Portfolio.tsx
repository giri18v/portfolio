'use client'

import { useState } from 'react'
import { Menu, Linkedin, Mail, Download, Github } from 'lucide-react'
import Image from 'next/image'

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#0A192F] text-[#8892B0]">
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-[#0A192F] bg-opacity-90">
        <div className="text-[#64FFDA] text-2xl font-bold">GV</div>
        <button 
          className="text-[#64FFDA] hover:text-[#64FFDA] transition-colors md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="text-[#64FFDA] hover:text-[#64FFDA]">About</a>
          <a href="#experience" className="text-[#64FFDA] hover:text-[#64FFDA]">Experience</a>
          <a href="#skills" className="text-[#64FFDA] hover:text-[#64FFDA]">Skills</a>
          <a href="#contact" className="text-[#64FFDA] hover:text-[#64FFDA]">Contact</a>
        </nav>
      </header>
      {menuOpen && (
        <nav className="fixed top-20 right-6 bg-[#112240] p-4 rounded-lg shadow-lg md:hidden">
          <ul className="space-y-2">
            <li><a href="#about" className="text-[#64FFDA] hover:text-[#64FFDA]">About</a></li>
            <li><a href="#experience" className="text-[#64FFDA] hover:text-[#64FFDA]">Experience</a></li>
            <li><a href="#skills" className="text-[#64FFDA] hover:text-[#64FFDA]">Skills</a></li>
            <li><a href="#contact" className="text-[#64FFDA] hover:text-[#64FFDA]">Contact</a></li>
          </ul>
        </nav>
      )}
      <main className="flex-grow pt-24">
        <section id="about" className="py-16 px-6 md:px-20 lg:px-32">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-64 h-64 relative rounded-full overflow-hidden border-4 border-[#64FFDA]">
              <Image
                src="/profile.jpg"
                alt="Giridharan Veeran"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#CCD6F6]">
                Giridharan Veeran
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#64FFDA]">
                Senior Java Backend Engineer
              </h2>
              <p className="text-xl mb-8 max-w-2xl">
                Experienced Senior Java Backend Engineer with a strong background in developing robust solutions. 
                Skilled in Microservices, Docker, Cloud Platforms (GCP and AWS), Terraform and database optimization. 
                Proven track record in project management, leadership, and client collaboration.
              </p>
              <div className="flex items-center space-x-4">
                <a 
                  href="mailto:giri18v@outlook.com"
                  className="flex items-center gap-2 text-[#64FFDA] hover:text-[#64FFDA] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/giridharan-veeran/"
                  className="flex items-center gap-2 text-[#64FFDA] hover:text-[#64FFDA] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/giri18v"
                  className="flex items-center gap-2 text-[#64FFDA] hover:text-[#64FFDA] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://leetcode.com/u/giri18v/"
                  className="flex items-center gap-2 text-[#64FFDA] hover:text-[#64FFDA] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-bold">LC</span>
                </a>
                <a 
                  href="tel:+44 07771254853"
                  className="text-[#64FFDA] hover:text-[#64FFDA] transition-colors"
                >
                  +44 07771254853
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-16 px-6 md:px-20 lg:px-32 bg-[#112240]">
          <h2 className="text-3xl font-bold mb-8 text-[#CCD6F6]">Work Experience</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-[#64FFDA]">Senior Associate Technology</h3>
              <p className="text-lg">PUBLICIS SAPIENT, LONDON | NOV-2022 – PRESENT</p>
              <p className="mt-2">Client: LBG (Lloyds Banking Group)</p>
              <p className="mt-2">Project: Intelligent Automation for Channels Enabling Platform</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Collaborated closely with clients to thoroughly understand their project requirements.</li>
                <li>Developed the API journey as a Java Backend Engineer, ensuring the delivery of robust and efficient solutions.</li>
                <li>Effectively engaged with third-party vendors to resolve project dependencies and streamline progress.</li>
                <li>Demonstrated strong leadership by managing teams in an On-shore Off-shore Model, promoting collaboration and productivity.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#64FFDA]">Consultant</h3>
              <p className="text-lg">VIRTUSA, BELFAST (UK) | July 2017 – Nov 2022</p>
              <p className="mt-2">Client: British Telecommunications</p>
              <p className="mt-2">Project: BT Consumer</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Led the transformation of the BT Consumer portal to a Microservice architecture.</li>
                <li>Successfully transitioned monolithic TV components into a Microservice Architecture.</li>
                <li>Designed and implemented diverse communication mediums, including HTTP and queues (Rabbit MQ).</li>
                <li>Conducted in-depth analysis of database usage, fine-tuning queries for optimal performance.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#64FFDA]">Software Engineer</h3>
              <p className="text-lg">TECH MAHINDRA, BANGALORE (INDIA) | OCT 2016 – JULY 2017</p>
              <p className="mt-2">Client: British Telecommunications</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Developed and maintained telecommunications software solutions for BT.</li>
                <li>Collaborated with cross-functional teams to implement system requirements.</li>
                <li>Participated in agile development processes and sprint planning.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16 px-6 md:px-20 lg:px-32">
          <h2 className="text-3xl font-bold mb-8 text-[#CCD6F6]">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Java', 'Spring Boot', 'Spring 5', 'Microservice', 'Docker', 'AWS', 'Google Cloud Platform', 'Terraform', 'DB2', 'MY SQL', 'Mongo DB', 'REST', 'Rabbit MQ', 'GIT', 'Prompt Engineering', 'Jenkins'].map((skill) => (
              <div key={skill} className="bg-[#112240] p-4 rounded-lg text-center">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16 px-6 md:px-20 lg:px-32 bg-[#112240]">
          <h2 className="text-3xl font-bold mb-8 text-[#CCD6F6]">Get in Touch</h2>
          <p className="text-xl mb-8">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          <a href="mailto:giri18v@outlook.com" className="bg-[#64FFDA] text-[#0A192F] px-6 py-3 rounded-full text-lg font-semibold transition-colors hover:bg-[#64FFDA] hover:text-[#0A192F]">
            Say Hello
          </a>
        </section>
      </main>
      <footer className="bg-[#0A192F] py-8 px-6 md:px-20 lg:px-32">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Giridharan Veeran. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-[#64FFDA] hover:text-[#64FFDA] transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:giri18v@outlook.com" className="text-[#64FFDA] hover:text-[#64FFDA] transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="/path-to-your-resume.pdf" download className="text-[#64FFDA] hover:text-[#64FFDA] transition-colors">
              <Download className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}