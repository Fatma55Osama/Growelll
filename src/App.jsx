import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Finddoctor from './Pages/Finddoctor'
import Event from './Pages/Event'
import logo from './assets/Growell.svg'
import frame from './assets/Frame 8745.svg'
import grop from './assets/Group 8752.png'
import Footer from './Component/Footer'
import Nav from './Component/Nav'
import './app.scss';
import DetailsEvent from './Pages/DetailsEvent'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Changpassword from './Pages/ChangPassword'
import DetailsDoctor from './Pages/DetailsDoctor'
import ScrollToTop from './ScrollToTop/ScrollToTop'
import MainLayout from './Component/MainLayout'
import Registeradmin from './Pages/Registeradmin'
import Loginadmin from './Pages/Loginadmin'
import Contactus from './Pages/Contactus'
import TestNow from './Pages/TestNow'
import TestCategory from './Pages/TestCategory'
import DetailsVedio from './Pages/DetailsVedio'
import Profile from './Pages/Profile'
import Reports from './Pages/Reports'
import Question from './Pages/Dashboard/Question'
import CreateQuestion from './Pages/Dashboard/CreateQuestion'
import EditeQuestion from './Pages/Dashboard/EditeQuestion'
import RegisterAdminn from './Pages/RegisterAdminn'
import ChangDoctorPasswordd from './Pages/ChangDoctorPasswordd'
import Test from './Pages/Dashboard/Test'
import CreateTest from './Pages/Dashboard/CreateTest'
import EditeTest from './Pages/Dashboard/EditeTest'
import EditeProfile from './Pages/EditeProfile'
import Errorpage from './Pages/Errorpage'
import Chat from './Pages/Chat'
import Ask from './Pages/Ask'
import Book from './Pages/Dashboard/Book'
import CreatBook from './Pages/Dashboard/CreatBook'
import EditeBook from './Pages/Dashboard/EditeBook'
import Viedo from './Pages/Dashboard/Viedo'
import CreateVedio from './Pages/Dashboard/CreateVedio'
import EditeVedio from './Pages/Dashboard/EditeVedio'
export default function App() {

  return (

    <BrowserRouter>
      {/* <AppLayout/> */}
      
      <Chat />
      <ScrollToTop />
      {/* start nav par bg-white of figma */}
      {/* 
      <div className=' allnavsuccess col-12  py-3 h-25'>
        <div className='navpar col-9 bg-white container mt-3 d-flex flex-row align-items-center justify-content-between'>
          <div className='ms-5'> <img src={logo} width="120px" height="48px" alt="" /></div>
          <div className='col-6' >
            <nav className=' d-flex flex-row justify-content-between me-3'>
              <Link className='nav-link' to="/Contact">Contact</Link>
              <Link className='nav-link' to="/Event">Events</Link>
              <Link className='nav-link' to="/Finddoctor">Find Doctor</Link>
              <Link className='nav-link' to="/">Home</Link>
              <li><img src={frame} width="36px" height="20px" /></li>
            </nav>
          </div>
        </div>
      </div> */}

      {/* end nav par bg-white of figma */}

      {/* <Nav/> */}

      <Routes>

        <Route path='/' element={<MainLayout />}>
          <Route index element={<Homepage />}></Route>
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path='/Event' element={<Event />}></Route>
          <Route path='/Finddoctor' element={<Finddoctor />}></Route>
          <Route path='/DetailsDoctor/:id' element={<DetailsDoctor />} />
          <Route path='/Contact' element={<Contactus />}></Route>
          <Route path='/DetailsEvent/:idevent' element={<DetailsEvent />}></Route>
          <Route path='/detailsvedio/:id' element={<DetailsVedio />}></Route>
          <Route path='/report' element={<Reports />}></Route>
          <Route path='/question' element={<Question />} />
          <Route path='/test' element={<Test />} />
          <Route path='/createtest' element={<CreateTest />} />

          <Route path='/createquestion' element={<CreateQuestion />} />
          <Route path='/createbook' element={<CreatBook />} />
          <Route path='/createvedio' element={<CreateVedio />} />

          <Route path='/editequestion/:id' element={<EditeQuestion />} />
          <Route path='/editetest/:id' element={<EditeTest />} />
          <Route path='/editebook/:id' element={<EditeBook/>} />
          <Route path='/editevedio/:id' element={<EditeVedio/>} />

          <Route path='/editeprofile/:id' element={<EditeProfile />} />
          <Route path='/ask' element={<Ask />} />
          <Route path='/bookdoctor' element={<Book />} />
          <Route path='/vediodoctor' element={<Viedo />} />

        </Route>

        <Route path='/'>
          <Route path='/DetailsDoctor/:id/test/:testNumber' element={<TestNow />} />
          <Route path='/DetailsDoctor/:id/tests' element={<TestCategory />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registeradmin2' element={<RegisterAdminn />} />

          <Route path='/loginadmin' element={<Loginadmin />} />
          <Route path='/changpassword' element={<Changpassword />} />
          <Route path='/changdoctorpassword' element={<ChangDoctorPasswordd />} />

          <Route path='/profile' element={<Profile />} />

          <Route path='*' element={<Errorpage />}></Route>
        </Route>
      </Routes>

      {/* <Footer/> */}
      {/* <div className='col-12 div9 bg-white d-flex  align-items-end '>

        <div className='col-12 babyblue d-flex flex-column align-content-center align-items-center justify-content-end gap-5'>

          <div className='gropimge'>
            <img src={grop} width="258px" height="279px" alt="" />
          </div>

          <div className='col-10  d-flex flex-row justify-content-between align-items-center'>
            <div className='col-3  mb-5 d-flex justify-content-center'>
              <img src={logo} width="130px" height="43px" alt="" />
            </div>

            <div className='col-5  d-flex flex-row justify-content-between '>

              <div>
                <ul>
                  <h5>COMPANY</h5>
                  <li>How it works</li>
                  <li>Pricing</li>
                  <li>Demo</li>
                </ul>
              </div>

              <div>
                <ul>
                  <h5>RESOURCES</h5>
                  <li>Blog post name goes here</li>
                  <li>Blog post name goes here</li>
                  <li>Blog post name goes here</li>
                  <li>See all resources</li>
                </ul>
              </div>

              <div>
                <ul>
                  <h5>ABOUT</h5>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-9 d-flex justify-content-center mb-4'>
            <span>Copyright © 2022 Company name</span>
          </div>
        </div>
      </div> */}
    </BrowserRouter>
  )
}
