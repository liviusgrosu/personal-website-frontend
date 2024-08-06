import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BlogPost, BlogPostDetail, IBlogPostDetail } from "../models/blogPost";
import { v4 as uuid } from "uuid";
import DOMPurify from "dompurify";
import { store } from "./store";

export default class BlogPostStore {
    blogPosts: BlogPost[] = [];
    selectedBlogPostDetails: IBlogPostDetail | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadBlogPosts = async () => {
        try {
            const blogPosts = await agent.Blogs.getList();
            runInAction(() => {
                this.blogPosts = blogPosts;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadBlogPostsDetails = async (id: string) => {
        try {
            const selectedBlogPost = await agent.Blogs.getDetails(id);
            runInAction(() => {
                this.selectedBlogPostDetails = selectedBlogPost;
                this.selectedBlogPostDetails!.content = DOMPurify.sanitize(selectedBlogPost.content);
            })
        } catch (error) {
            console.log(error);
        }
    }

    createBlogPostDetails = async(title: string, description: string, date: Date, content: string) =>  {
        try {
            await agent.Blogs.createDetails(
                new BlogPostDetail(
                    uuid(), 
                    title,
                    description,
                    date, 
                    content
                )
            );
        } catch (error) {
            console.log(error);
        }
    }

    updateBlogPostDetails = async (title: string, description: string, date: Date, content: string) => {
        console.log(`date2 : ${date}`)
        try {
            if (this.selectedBlogPostDetails) {
                this.selectedBlogPostDetails.title = title;
                this.selectedBlogPostDetails.description = description;
                this.selectedBlogPostDetails.date = date;
                this.selectedBlogPostDetails.content = content;
                await agent.Blogs.updateDetails(this.selectedBlogPostDetails);
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteBlogPost = async (id: string) => {
        try {
            await agent.Blogs.delete(id);
            this.blogPosts = this.blogPosts.filter(blogPost => blogPost.id !== id);
        } catch (error) {
            console.log(error);
        }
    }

    uploadPhoto = async (id: string, file: Blob) => {
        try {
            console.log('attempting to upload photo');
            const response = await agent.Blogs.updatePhoto(id, file);
            const photo = response.data;
            store.modalStore.closeModal();
            runInAction(() => {
                this.blogPosts.find(blogPost => blogPost.id === id)!.image = photo.url;
            });
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBlogPostDetails = () => {
        this.selectedBlogPostDetails = null;
    }
}