import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Post = styled.div`
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.25s ease;
  &:hover {
    background-color: #f2f2f2;
  }
`

const PostImage = styled.div`
  flex: 25%;
  margin: 1rem;
`

const PostText = styled.div`
  flex: 75%;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulPost.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <Link style={{ boxShadow: `none` }} to={node.slug}>
              <Post key={node.slug}>
                <PostImage>
                  {node.image !== null ? (
                    <Img fluid={node.image.fluid} />
                  ) : null}
                </PostImage>
                <PostText>
                  <h2>{title}</h2>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  />
                  <p>{node.subtitle}</p>
                </PostText>
              </Post>
            </Link>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          author
          slug
        }
      }
    }
  }
`
