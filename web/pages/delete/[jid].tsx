import React from "react";
import axios from '../../utils/axios'



class Delete extends React.Component{
    static async getInitialProps(ctx: any) {
        const response = await axios({
          method: 'delete',
          url: `/v1/jobs/${ctx.query.jid}`,
          headers: ctx.req ? {
            cookie: ctx.req.headers.cookie,
            'Content-Type': 'application/json',
          } : undefined,
          withCredentials: true,
        })
        return {
          job: response.data
        }
      }
      
    redirect() {
        window.location.href = '/home'
    }
      
      render() {
          return <div>{this.redirect}</div>
      }
       
}


export default Delete