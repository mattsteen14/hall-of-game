import PropTypes from 'prop-types';
import './ParentPlatformIcons.css';
import { useFilterHandlers } from '../../utils/handlers';

import {
    SiSega,
    SiPlaystation,
    SiXbox,
    SiNintendo,
    SiApple,
    SiWindows,
    SiLinux,
    SiAndroid,
    SiAtari,
    SiCommodore
} from "react-icons/si";

import { TbSquareRoundedLetterN, TbSquareRoundedNumber3 } from "react-icons/tb";
import { GiRetroController } from "react-icons/gi";
import { FaAppStoreIos } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

export const ParentPlatformIcons = ({ parentPlatforms }) => {
    const { handleParentPlatformClick } = useFilterHandlers();
    const platformIcons = {
        playstation: SiPlaystation,
        xbox: SiXbox,
        nintendo: TbSquareRoundedLetterN || SiNintendo,
        sega: SiSega,
        pc: SiWindows,
        mac: SiApple,
        linux: SiLinux,
        android: SiAndroid,
        ios: FaAppStoreIos,
        atari: SiAtari,
        'commodore-amiga': SiCommodore,
        web: TbWorldWww,
        'neo-geo': GiRetroController,
        '3do': TbSquareRoundedNumber3,
    }

    return (
        <div>
            {parentPlatforms.map((platform) => {
                if(!platform || !platform.platform) return null;
                const Icon = platformIcons[platform.platform.slug] || platformIcons['undefined'];
                const isNintendo = platform.platform.slug === 'nintendo';
                const is3do = platform.platform.slug === '3do';
                return (
                    <span key={platform.platform.id}
                        className={`parent-platform-icon ${isNintendo ? 'nintendo-icon' : ''} ${is3do ? 'threedo-icon' : ''}`}
                    >
                        <a onClick={(e) => handleParentPlatformClick(e, platform.platform.id)}>
                            <Icon />
                        </a>
                    </span>
                )
            })
            }
        </div>
    )
}

ParentPlatformIcons.defaultProps = {
    parentPlatforms: [] // default to an empty array
};
ParentPlatformIcons.propTypes = {
    parentPlatforms: PropTypes.arrayOf(PropTypes.object).isRequired
}