
import { AppIcon, AppImage, Block } from '@/components';
import { rgba } from '@/utils';
import { Linking } from 'react-native';

const HowToDoCarousel = (props) => {
  const { video, image } = props;

  return (
    <>

      <Block relative style={{ alignSelf: 'stretch' }}>
        {
          video ?
            <>
              <AppImage url={'https://img.youtube.com/vi/' + video + '/maxresdefault.jpg'} height={200} width={null} />
              <Block pressable absolute style={{ left: 0, right: 0, top: 0, bottom: 0, backgroundColor: rgba("#000", 0.3) }} center middle onPress={() => {
                Linking.openURL('vnd.youtube://video/' + video).then((res) => {
                }).catch((err) => {
                  Linking.openURL('https://www.youtube.com/watch?v=' + video)
                }
                )

              }}
              >
                <Block rounded-100 backgroundColor={rgba("#fff", 0.3)} height={100} width={100} center middle>
                  <AppIcon name="play" color="#fff" size={30} />
                </Block>

              </Block>
            </>
            :

            <AppImage url={image?.url} height={200} width={null} resizeMode="contain"/>
        }

      </Block>
    </>
  );
};

export default HowToDoCarousel;
