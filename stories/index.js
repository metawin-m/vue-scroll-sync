import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import {
    withKnobs,
    text,
    number,
    boolean,
    color,
} from '@storybook/addon-knobs';

import ScrollSync from '../src/ScrollSync.vue';

storiesOf('Vertical Scroll Sync', module)
    .addDecorator(withKnobs)
    .add('Static', () => {
        const containerHeight = number('Container Height', 500)
        const leftHeight = number('Left Content Height', 1000)
        const rightHeight = number('Right Content Height', 2000)
        const containerStyle = `height:${containerHeight}px;width:100px;`
        const topColor = color('Top Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const bottomColor = color('Bottom Color', '#0000ff')
        const bg = `linear-gradient(${topColor}, ${centerColor}, ${bottomColor})`
        return ({
            components: { ScrollSync },
            template: `
            <div style="display:flex;">
                <scroll-sync vertical style="${containerStyle}margin-right:50px;">
                    <div style="width:100px;height:${leftHeight}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync vertical style="${containerStyle}">
                    <div style="width:100px;height:${rightHeight}px;background:${bg};" />
                </scroll-sync>
            </div>
        `})
        }
    )
    .add('Proportional', () => {
        const containerHeight = number('Container Height', 500)
        const leftHeight = number('Left Content Height', 1000)
        const rightHeight = number('Right Content Height', 2000)
        const containerStyle = `height:${containerHeight}px;width:100px;`
        const topColor = color('Top Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const bottomColor = color('Bottom Color', '#0000ff')
        const bg = `linear-gradient(${topColor}, ${centerColor}, ${bottomColor})`
        return ({
            components: { ScrollSync },
            template: `
            <div style="display:flex;">
                <scroll-sync proportional vertical style="${containerStyle}margin-right:50px;">
                    <div style="width:100px;height:${leftHeight}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync proportional vertical style="${containerStyle}">
                    <div style="width:100px;height:${rightHeight}px;background:${bg};" />
                </scroll-sync>
            </div>
        `})
        }
    )

storiesOf('Horizontal Scroll Sync', module)
    .addDecorator(withKnobs)
    .add('Static', () => {
        const containerWidth = number('Container Width', 500)
        const topWidth = number('Top Content Width', 1000)
        const bottomWidth = number('Bottom Content Width', 2000)
        const containerStyle = `height:100px;width:${containerWidth}px;`
        const leftColor = color('Left Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const rightColor = color('Right Color', '#0000ff')
        const bg = `linear-gradient(0.25turn, ${leftColor}, ${centerColor}, ${rightColor})`
        return ({
            components: { ScrollSync },
            template: `
            <div>
                <scroll-sync horizontal style="${containerStyle}margin-bottom:50px;">
                    <div style="height:100px;width:${topWidth}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync horizontal style="${containerStyle}">
                    <div style="height:100px;width:${bottomWidth}px;background:${bg};" />
                </scroll-sync>
            </div>
        `})
        }
    )
    .add('Proportional', () => {
        const containerWidth = number('Container Width', 500)
        const topWidth = number('Top Content Width', 1000)
        const bottomWidth = number('Bottom Content Width', 2000)
        const containerStyle = `height:100px;width:${containerWidth}px;`
        const leftColor = color('Left Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const rightColor = color('Right Color', '#0000ff')
        const bg = `linear-gradient(0.25turn, ${leftColor}, ${centerColor}, ${rightColor})`
        return ({
            components: { ScrollSync },
            template: `
            <div>
                <scroll-sync proportional horizontal style="${containerStyle}margin-bottom:50px;">
                    <div style="height:100px;width:${topWidth}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync proportional horizontal style="${containerStyle}">
                    <div style="height:100px;width:${bottomWidth}px;background:${bg};" />
                </scroll-sync>
            </div>
        `})
        }
    )

storiesOf('Advance Usage', module)
    .addDecorator(withKnobs)
    .add('Scroll Sync on both direction', () => {
        const proportional = boolean('Proportional', false)
        const containerWidth = number('Container Width', 500)
        const containerHeight = number('Container Height', 500)
        const leftContentWidth = number('Left Content Width', 2000)
        const leftContentHeight = number('Left Content Height', 2000)
        const rightContentWidth = number('Right Content Width', 3000)
        const rightContentHeight = number('Right Content Height', 3000)
        const leftColor = color('Left Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const rightColor = color('Right Color', '#0000ff')
        const bg = `radial-gradient(${leftColor} 0%, ${centerColor} 33%, ${rightColor} 67%)`
        return ({
            components: { ScrollSync },
            template: `
            <div style="display:flex;">
                <scroll-sync vertical horizontal :proportional=${proportional} style="width:${containerWidth}px;height:${containerHeight}px;margin-right:20px;">
                    <div style="height:${leftContentHeight}px;width:${leftContentWidth}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync vertical horizontal :proportional=${proportional} style="width:${containerWidth}px;height:${containerHeight}px;">
                    <div style="height:${rightContentHeight}px;width:${rightContentWidth}px;background:${bg};" />
                </scroll-sync>
            </div>
        `})
        }
    )
    .add('Scroll Sync on multiple direction on multiple component', () => {
        const containerWidth = number('Container Width', 500)
        const containerHeight = number('Container Height', 500)
        const mainContentWidth = number('Main Content Width', 2000)
        const mainContentHeight = number('Main Content Height', 2000)
        const leftColor = color('Left Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const rightColor = color('Right Color', '#0000ff')
        const leftBg = `linear-gradient(${leftColor}, ${centerColor}, ${rightColor})`
        const topBg = `linear-gradient(0.25turn, ${leftColor}, ${centerColor}, ${rightColor})`
        const mainBg = `radial-gradient(${leftColor} 0%, ${centerColor} 33%, ${rightColor} 67%)`

        return ({
            components: { ScrollSync },
            template: `
            <div style="display:flex;">
                <div style="margin-top:70px;margin-right:20px;">
                    <scroll-sync vertical style="width:50px;height:${containerHeight}px;">
                        <div style="height:${mainContentHeight}px;width:50px;background:${leftBg};" />
                    </scroll-sync>
                </div>
                <div>
                    <scroll-sync horizontal style="height:50px;width:${containerWidth}px;margin-bottom:20px;">
                        <div style="height:50px;width:${mainContentWidth}px;background:${topBg};" />
                    </scroll-sync>
                    <scroll-sync vertical horizontal style="width:${containerWidth}px;height:${containerHeight}px;">
                        <div style="height:${mainContentHeight}px;width:${mainContentWidth}px;background:${mainBg};" />
                    </scroll-sync>
                </div>
            </div>
        `})
        }
    )
    .add('Scroll Group', () => {
        const containerWidth = number('Container Width', 500)

        const firstWidth = number('First Content Width', 1000)
        const firstGroup = text('First Group', 'one')
        const firstProportional = boolean('First Proportional', false)

        const secondWidth = number('Second Content Width', 1000)
        const secondGroup = text('Second Group', 'two')
        const secondProportional = boolean('Second Proportional', false)

        const thirdWidth = number('Third Content Width', 1000)
        const thirdGroup = text('Third Group', 'one')
        const thirdProportional = boolean('Third Proportional', false)

        const fourthWidth = number('Fourth Content Width', 2000)
        const fourthGroup = text('Fourth Group', 'two')
        const fourthProportional = boolean('Fourth Proportional', false)

        const containerStyle = `height:100px;width:${containerWidth}px;`
        const leftColor = color('Left Color', '#ff0000')
        const centerColor = color('Center Color', '#00ff00')
        const rightColor = color('Right Color', '#0000ff')
        const bg = `linear-gradient(0.25turn, ${leftColor}, ${centerColor}, ${rightColor})`
        return ({
            components: { ScrollSync },
            template: `
            <div>
                <scroll-sync :proportional=${firstProportional} group=${firstGroup} horizontal style="${containerStyle}margin-bottom:50px;">
                    <div style="height:100px;width:${firstWidth}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync :proportional=${secondProportional} group=${secondGroup} horizontal style="${containerStyle}margin-bottom:50px;">
                    <div style="height:100px;width:${secondWidth}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync :proportional=${thirdProportional} group=${thirdGroup} horizontal style="${containerStyle}margin-bottom:50px;">
                    <div style="height:100px;width:${thirdWidth}px;background:${bg};" />
                </scroll-sync>
                <scroll-sync :proportional=${fourthProportional} group=${fourthGroup} horizontal style="${containerStyle}">
                    <div style="height:100px;width:${fourthWidth}px;background:${bg};" />
                </scroll-sync>
            </div>
        `})
        }
    )
