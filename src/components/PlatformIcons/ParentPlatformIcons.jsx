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

import { TbSquareRoundedLetterN } from "react-icons/tb";
import { GiRetroController } from "react-icons/gi";
import { IoLogoGameControllerA } from "react-icons/io";
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
        '3do': IoLogoGameControllerA,
    }

    return (
        <div>
            {parentPlatforms.map((platform) => {
                if(!platform || !platform.platform) return null;
                const Icon = platformIcons[platform.platform.slug] || platformIcons['undefined'];
                const isNintendo = platform.platform.slug === 'nintendo';
                return (
                    <span key={platform.platform.id}
                        className={`parent-platform-icon ${isNintendo ? 'nintendo-icon' : ''}`}
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