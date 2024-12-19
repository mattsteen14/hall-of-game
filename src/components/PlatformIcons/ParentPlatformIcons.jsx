import PropTypes from 'prop-types';
import './ParentPlatformIcons.css';
import { useFilterHandlers } from '../../utils/handlers';
import { clsx } from 'clsx'; // Optional for cleaner className logic

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
    SiCommodore,
} from "react-icons/si";

import { TbSquareRoundedLetterN, TbSquareRoundedNumber3 } from "react-icons/tb";
import { GiRetroController } from "react-icons/gi";
import { FaAppStoreIos } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

// Icon mapping outside the component to prevent re-creation on every render
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
};

export const ParentPlatformIcons = ({ parentPlatforms }) => {
    const { handleParentPlatformClick } = useFilterHandlers();

    return (
        <div>
            {parentPlatforms.map((platform) => {
                if (!platform?.platform) return null;

                const { slug, id, name } = platform.platform;
                const Icon = platformIcons[slug] || null;

                return (
                    <span
                        key={id}
                        className={clsx(
                            'parent-platform-icon',
                            slug === 'nintendo' && 'nintendo-icon',
                            slug === '3do' && 'threedo-icon'
                        )}
                    >
                        {Icon && (
                            <a
                                onClick={(e) => handleParentPlatformClick(e, id)}
                                role="filter"
                                aria-label={`${name} icon`}
                                title={`${name} icon`}
                                name={`${name} icon`}
                                className="platform-icon-link"
                            >
                                <Icon aria-hidden="true" />
                            </a>
                        )}
                    </span>
                );
            })}
        </div>
    );
};

ParentPlatformIcons.defaultProps = {
    parentPlatforms: [],
};

ParentPlatformIcons.propTypes = {
    parentPlatforms: PropTypes.arrayOf(
        PropTypes.shape({
            platform: PropTypes.shape({
                slug: PropTypes.string.isRequired,
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
};