import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import 'confetti-js'

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  componentDidMount () {
    /* global ConfettiGenerator */
    this.canvas = new ConfettiGenerator({
      animate: true,
      clock: '1',
      colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
      max: '50',
      props: ['circle', 'line', 'triangle'],
      size: '1',
      target: 'confetti-canvas'
    })

    this.canvas.render()
  }

  componentWillUnmount () {
    this.canvas.clear()
  }

  render () {
    return (
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `}
        render={({ site }) => (
          <div
            css={`
              align-items: center;
              display: grid;
              grid-gap: 40px;
              grid-template-columns: 1fr;
              margin: 0 auto;
              max-width: 560px;
              min-height: 100vh;
              padding: 40px;

              & > * {
                justify-self: center;
              }
            `}
          >
            {/* Headers. */}
            <Helmet defaultTitle={site.siteMetadata.title} titleTemplate={`%s`}>
              <html lang='en' />
              <meta charSet='utf-8' />
              <meta
                name='description'
                content={site.siteMetadata.description}
              />
            </Helmet>

            {/* Animated confetti background. */}
            <canvas
              id='confetti-canvas'
              css={`
                bottom: 0;
                left: 0;
                opacity: 0.5;
                position: fixed;
                right: 0;
                top: 0;
                z-index: -1;
              `}
            />

            {/* Page content. */}
            {this.props.children}
          </div>
        )}
      />
    )
  }
}

export default Layout
