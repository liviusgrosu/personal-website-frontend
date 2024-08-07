import { /*Navigate,*/ createHashRouter } from "react-router-dom";
import App from "../../App";
import AboutPage from "../../features/AboutPage"
import ContactPage from "../../features/ContactPage";
import ProjectsPage from "../../features/ProjectsPage";
// import ProjectDetail from "../../features/ProjectDetail";
import BlogPosts from "../../features/BlogPosts";
// import BlogPostDetail from "../../features/BlogPostDetail";
import LoginForm from "../../features/LoginForm";
// import ProjectEdit from "../../features/ProjectEdit";
// import BlogPostEdit from "../../features/BlogPostEdit";
// import AboutEdit from "../../features/AboutEdit";
// import RequireAuth from "./RequireAuth";
// import NotFound from "../../errors/NotFound";
export const router = createHashRouter([
    {
        path: '/personal-website-frontend/',
        element: <App/>,
        children: 
        [
            // {element: <RequireAuth/>, children: [
            //     { path: 'about-edit', element: <AboutEdit/> },
            //     { path: 'projects-edit/:id', element: <ProjectEdit key='edit'/>},
            //     { path: 'projects-create', element: <ProjectEdit key='create'/>},
            //     { path: 'blog-edit/:id', element: <BlogPostEdit key='edit'/> },
            //     { path: 'blog-create', element: <BlogPostEdit key='create'/> }
            // ]},
            { path: 'about', element: <AboutPage/> },
            { path: 'projects', element: <ProjectsPage/> },
            // { path: 'projects/:id', element: <ProjectDetail/> },
            { path: 'blog', element: <BlogPosts/> },
            // { path: 'blog/:id', element: <BlogPostDetail/> },
            { path: 'login', element: <LoginForm/>},
            { path: 'contact', element: <ContactPage/>},
            // { path: '/personal-website-frontend', element: <Navigate to="/personal-website-frontend/about" /> },
            // { path: 'not-found', element: <NotFound/>},
            // { path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
])