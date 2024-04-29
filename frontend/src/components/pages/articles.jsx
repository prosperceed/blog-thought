import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

function Articles() {

    const { id } = useParams()
    const { data: article, isLoading, isError } = useQuery({
        queryKey: [],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:8000/article/`+ id)
                return response.data
            } catch (error) {
                throw new Error('Error fetching article:', error)
            }
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error fetching article</div>

    return (
        <div className="h-[100vh] max-w-md mx-auto flex items-center justify-center">
            {article && (
                <div className="text-primary-content">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <h2 className="card-title">{article.title}</h2>
                            <h2 className="font-bold text-sm text-warning">{moment(article.date).format('MMMM D, YYYY')}</h2>
                        </div>
                        <p className="">{article.body}</p>
                        <div className="card-actions flex flex-col justify-end mt-10 text-sm text-">
                          {/* <h2 className="-mb-[10px]">Author</h2> */}
                           <p>~ {article.author}</p>
                        </div>
                        <a className="btn text-primary mt-8 w-1/2">
                        <Link className="text-white" to="/">See all articles...</Link>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Articles
