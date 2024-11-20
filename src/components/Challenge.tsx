import ChallengeButton from "./ChallengeButton";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

async function getChallenge(userId: string) {
    const res = await fetch(`${process.env.APP_URL}/api/challenge/${userId}`);
    const data = await res.json();
    return data;
}

export default async function Challenge({ userId }: { userId: string }) {
    let challenge = await getChallenge(userId);
    const read = challenge.amountCompleted;
    const total = challenge.amount;

    const completedPercent = Math.floor(100 * Math.min(read, total) / total);
    const remainingPercent = 100 - completedPercent;

    return (
        <div className="flex flex-col gap-3">
            <Label className="text-slate-700">2024 Reading Challenge</Label>
            <p className="text-xs">Challenge yourself to read more this year!</p>
            <div className="flex gap-3">
                <div className="flex flex-col items-center bg-stone-100 rounded-lg p-1 relative">
                    {(challenge.amount <= challenge.amountCompleted) && 
                        <div className="absolute left-0 top-0">
                            <CompletedSVG size={60} />
                        </div>
                    }
                    <p className="text-3xl mb-[2px] text-slate-700 font-semibold">2024</p>
                    <BookSVG color="#BAAD99" size={25}/>
                    <div className="items-center">
                        <p className="text-[19px] mt-1 text-slate-700 font-semibold">READING</p>
                        <p className="text-[14px] mt-[-8px] text-slate-700 font-semibold">CHALLENGE</p>
                    </div>
                </div>
                { !challenge.amount ?
                    <ChallengeButton userId={userId} />
                    :
                    <div className="flex flex-col w-full pt-2">
                        { (challenge.amount > challenge.amountCompleted) ? 
                            <>
                                <p className="text-3xl font-semibold text-slate-700">{challenge.amountCompleted}</p>
                                <p className="text-sm text-nowrap  mt-[-5px] text-slate-600">book{challenge.amountCompleted == 1 ? '' : 's'} completed</p>
                            </>
                            :
                            <>
                                <p className="text-sm text-nowrap text-slate-800 font-semibold">Congrats!</p>
                                <p className="text-sm w-40 text-slate-600">You have read {challenge.amountCompleted} books of your goal of {challenge.amount}!</p>
                            </>
                        }

                        <div className="flex flex-col gap-2">
                            {(challenge.amount > challenge.amountCompleted) && <p className="text-xs text-nowrap text-slate-500">{challenge.amount - challenge.amountCompleted}  book{(challenge.amount - challenge.amountCompleted) == 1 ? '' : 's'} behind schedule</p>}
                            <div className="flex items-center gap-2">
                                <div className="flex w-full">
                                <Progress className="h-3" value={completedPercent} indicatorColor="bg-[#BAAD99]"/>
                                </div>
                                <p className="text-sm text-slate-700">{challenge.amountCompleted}/{challenge.amount}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const BookSVG = ({ size = 112, color = "#FFFCFC" }) => {
    const width = (357 / 112) * size; // Maintain aspect ratio
  
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}px`}
        height={`${size}px`}
        viewBox="0 0 357 112"
        version="1.1"
      >
        <defs>
          <polygon
            id="path-1"
            points="356.218849 88.5572139 0 88.5572139 0 0.310621218 356.218849 0.310621218"
          />
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-22.000000, -54.000000)">
            <g transform="translate(22.000000, 54.000000)">
              <g transform="translate(0.000000, 22.885572)">
                <mask id="mask-2" fill="white">
                  <use xlinkHref="#path-1" />
                </mask>
                <g />
                <path
                  d="M49.0949886,15.2262417 C49.0949886,15.2262417 104.337371,5.57636206 117.022406,3.22873889 C129.707441,0.92510865 150.488205,-1.07457037 162.653706,2.57684352 C174.819208,6.22825742 178.845164,14.5743463 178.845164,14.5743463 C178.845164,14.5743463 183.910756,4.9244667 195.080438,2.57684352 C206.25012,0.229791687 214.346418,-0.770047825 231.576943,1.92494816 C248.807468,4.57652255 277.164996,11.2268836 307.600658,15.2262417 L309.634976,15.9215587 L312.665681,16.573454 L314.700568,19.2255997 L316.734885,19.9209167 L356.218849,65.5193118 L355.223029,88.5573282 C355.223029,88.5573282 291.711929,77.9070377 274.134291,75.2560347 C256.557221,72.5610387 228.546237,69.0398896 210.276077,72.5610387 C192.049732,76.125038 191.703756,76.8209263 185.945643,81.2545004 C185.945643,81.2545004 178.19589,81.9063958 170.749435,81.2545004 C170.749435,81.2545004 157.242138,72.8215683 139.318523,71.908572 C121.438155,71.0395686 99.4453359,71.6920353 72.4301721,76.5598254 C45.4150083,81.4721797 10.7790949,87.6883248 0.995024876,88.5573282 L-1.8161064e-15,65.6716418 L40.0028709,20.5728121 L44.0293965,16.573454 L49.0949886,15.2262417 Z"
                  fillOpacity="0.6"
                  fill={color}
                  mask="url(#mask-2)"
                />
              </g>
              <path
                d="M178.127713,13.3304428 C178.12164,13.2541226 178.115553,13.177767 178.109453,13.101376 C176.678841,10.8529962 172.127205,4.92911804 162.374431,2.0316863 C150.194004,-1.6432438 129.387745,0.345401484 116.687147,2.68073829 C103.986549,5.01550675 48.6763916,14.6148834 48.6763916,14.6148834 L43.6045846,15.955045 L39.5736888,19.9334723 L34.5018818,20.5825243 L0,88.5572139 C9.79664357,87.6927585 44.9918964,80.4709266 72.0402043,75.6274756 C99.0885121,70.7851613 121.108883,70.0929149 139.011188,71.001133 C156.950961,71.865335 175.113724,83.5752194 178.603898,90.5014708 C178.60492,90.5096501 178.605942,90.5178281 178.606965,90.5260046 C182.089552,82.5870647 191.810485,75.2275208 210.063712,71.691507 C228.36025,68.1543595 256.413117,71.691507 274.015542,74.3216936 C291.619107,76.9955277 356.218905,88.5572139 356.218905,88.5572139 L322.749321,20.7582834 L316.679539,19.4210829 L314.642222,18.7743064 L312.603764,16.143553 L309.568588,15.4536958 L307.531271,14.8069193 C277.051288,10.8389654 248.651934,4.24025798 231.395426,1.56699073 C214.139487,-1.06376273 206.031818,-0.0717742464 194.845661,2.25684787 C183.659505,4.54238933 178.585872,14.159576 178.585872,14.159576 L178.127713,13.3304429 Z"
                fill={color}
              />
            </g>
          </g>
        </g>
    </svg>
    )
  };

  const CompletedSVG = ({
    size = 336,
    colors = {
      polygon: "#FFFFFF",
      path1: "#baad99",
      path2: "#000000",
      path3: "#000000",
      path4: "#baad99",
    },
  }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 336 336"
      >
        <defs>
          <polygon id="path-1" points="0 0 500 0 0 340" />
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g>
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1" />
            </mask>
            <g />
            <g mask="url(#mask-2)">
              <g transform="translate(-72.000000, -80.000000)">
                <polygon
                  fill={colors.polygon}
                  fillRule="evenodd"
                  points="11 351.025006 362.025006 0 424.100006 62.0749999 73.0749999 413.100006"
                />
                <path
                  d="M5.76643854,361.989662 L62.334981,418.558204 L408.553605,72.3395802 L351.985063,15.7710377 L5.76643854,361.989662 Z M0.109584291,361.989662 L351.985063,10.1141834 L414.21046,72.3395802 L62.334981,424.215059 L0.109584291,361.989662 Z"
                  fill={colors.path1}
                  fillRule="nonzero"
                />
                <path
                  d="M68.6634805,225.408537 C68.8634815,225.408537 69.0634795,225.446037 69.2634805,225.521037 C69.4634815,225.596038 69.6551463,225.725203 69.8384805,225.908537..."
                  fill={colors.path2}
                />
                <path
                  d="M143.272176,218.183537 C143.605511,218.816874 143.926341,219.4752 144.234676,220.158537 C144.54301,220.841874 144.838841,221.541867 145.122176,222.258537..."
                  fill={colors.path3}
                />
                <path xmlns="http://www.w3.org/2000/svg" d="M68.6634805,225.408537 C68.8634815,225.408537 69.0634795,225.446037 69.2634805,225.521037 C69.4634815,225.596038 69.6551463,225.725203 69.8384805,225.908537 L73.1884805,229.433537 C71.7218065,231.350213 69.8843249,232.796032 67.6759805,233.771037 C65.4676361,234.746042 62.8551623,235.233537 59.8384805,235.233537 C57.0718,235.233537 54.5926581,234.762709 52.4009805,233.821037 C50.2093029,232.879366 48.3509881,231.579379 46.8259805,229.921037 C45.3009729,228.262696 44.1301513,226.296049 43.3134805,224.021037 C42.4968098,221.746026 42.0884805,219.275217 42.0884805,216.608537 C42.0884805,213.891857 42.5551425,211.396049 43.4884805,209.121037 C44.4218185,206.846026 45.7259721,204.883545 47.4009805,203.233537 C49.0759889,201.583529 51.0801355,200.300208 53.4134805,199.383537 C55.7468255,198.466866 58.3217998,198.008537 61.1384805,198.008537 C62.505154,198.008537 63.7926411,198.129369 65.0009805,198.371037 C66.2093199,198.612705 67.3384753,198.946035 68.3884805,199.371037 C69.4384858,199.796039 70.4051428,200.304368 71.2884805,200.896037 C72.1718183,201.487707 72.9551438,202.141867 73.6384805,202.858537 L70.7884805,206.683537 C70.6051463,206.916872 70.3884818,207.12937 70.1384805,207.321037 C69.8884793,207.512705 69.5384828,207.608537 69.0884805,207.608537 C68.788479,207.608537 68.5051485,207.541871 68.2384805,207.408537 C67.9718125,207.275203 67.688482,207.112705 67.3884805,206.921037 C67.088479,206.72937 66.7593156,206.521038 66.4009805,206.296037 C66.0426454,206.071036 65.6176496,205.862705 65.1259805,205.671037 C64.6343114,205.47937 64.0593171,205.316871 63.4009805,205.183537 C62.7426439,205.050203 61.9718183,204.983537 61.0884805,204.983537 C59.5551395,204.983537 58.1551535,205.254368 56.8884805,205.796037 C55.6218075,206.337707 54.5343184,207.112699 53.6259805,208.121037 C52.7176426,209.129376 52.0093164,210.350197 51.5009805,211.783537 C50.9926446,213.216878 50.7384805,214.825195 50.7384805,216.608537 C50.7384805,218.475213 50.9926446,220.13353 51.5009805,221.583537 C52.0093164,223.033544 52.7009761,224.254366 53.5759805,225.246037 C54.4509849,226.237709 55.471808,226.991868 56.6384805,227.508537 C57.805153,228.025206 59.0551405,228.283537 60.3884805,228.283537 C61.155151,228.283537 61.855144,228.246038 62.4884805,228.171037 C63.121817,228.096037 63.7093111,227.966871 64.2509805,227.783537 C64.7926499,227.600203 65.3093114,227.362705 65.8009805,227.071037 C66.2926496,226.779369 66.788478,226.416873 67.2884805,225.983537 C67.4884815,225.81687 67.705146,225.679371 67.9384805,225.571037 C68.171815,225.462703 68.4134793,225.408537 68.6634805,225.408537 Z M116.792828,216.608537 C116.792828,219.241884 116.338666,221.691859 115.430328,223.958537 C114.52199,226.225215 113.242836,228.196029 111.592828,229.871037 C109.94282,231.546046 107.95534,232.858532 105.630328,233.808537 C103.305316,234.758542 100.726176,235.233537 97.892828,235.233537 C95.0594805,235.233537 92.476173,234.758542 90.142828,233.808537 C87.809483,232.858532 85.8136697,231.546046 84.155328,229.871037 C82.4969864,228.196029 81.2136659,226.225215 80.305328,223.958537 C79.3969902,221.691859 78.942828,219.241884 78.942828,216.608537 C78.942828,213.975191 79.3969902,211.525215 80.305328,209.258537 C81.2136659,206.991859 82.4969864,205.025212 84.155328,203.358537 C85.8136697,201.691862 87.809483,200.383542 90.142828,199.433537 C92.476173,198.483532 95.0594805,198.008537 97.892828,198.008537 C100.726176,198.008537 103.305316,198.487699 105.630328,199.446037 C107.95534,200.404375 109.94282,201.716862 111.592828,203.383537 C113.242836,205.050212 114.52199,207.016859 115.430328,209.283537 C116.338666,211.550215 116.792828,213.991857 116.792828,216.608537 Z M108.142828,216.608537 C108.142828,214.808528 107.909497,213.187711 107.442828,211.746037 C106.976159,210.304363 106.305332,209.083542 105.430328,208.083537 C104.555324,207.083532 103.484501,206.316873 102.217828,205.783537 C100.951155,205.250201 99.5095028,204.983537 97.892828,204.983537 C96.2594865,204.983537 94.8053344,205.250201 93.530328,205.783537 C92.2553217,206.316873 91.1803324,207.083532 90.305328,208.083537 C89.4303237,209.083542 88.759497,210.304363 88.292828,211.746037 C87.826159,213.187711 87.592828,214.808528 87.592828,216.608537 C87.592828,218.425213 87.826159,220.054363 88.292828,221.496037 C88.759497,222.937711 89.4303237,224.158532 90.305328,225.158537 C91.1803324,226.158542 92.2553217,226.921035 93.530328,227.446037 C94.8053344,227.97104 96.2594865,228.233537 97.892828,228.233537 C99.5095028,228.233537 100.951155,227.97104 102.217828,227.446037 C103.484501,226.921035 104.555324,226.158542 105.430328,225.158537 C106.305332,224.158532 106.976159,222.937711 107.442828,221.496037 C107.909497,220.054363 108.142828,218.425213 108.142828,216.608537 Z M143.272176,218.183537 C143.605511,218.816874 143.926341,219.4752 144.234676,220.158537 C144.54301,220.841874 144.838841,221.541867 145.122176,222.258537 C145.40551,221.5252 145.705507,220.812707 146.022176,220.121037 C146.338844,219.429367 146.663841,218.75854 146.997176,218.108537 L156.347176,199.708537 C156.513843,199.391869 156.684675,199.146038 156.859676,198.971037 C157.034676,198.796036 157.230508,198.666871 157.447176,198.583537 C157.663843,198.500203 157.909674,198.450204 158.184676,198.433537 C158.459677,198.41687 158.780507,198.408537 159.147176,198.408537 L165.597176,198.408537 L165.597176,234.833537 L158.147176,234.833537 L158.147176,213.883537 C158.147176,212.866865 158.197175,211.766876 158.297176,210.583537 L148.647176,229.308537 C148.347174,229.891873 147.943011,230.333536 147.434676,230.633537 C146.92634,230.933539 146.347179,231.083537 145.697176,231.083537 L144.547176,231.083537 C143.897172,231.083537 143.318011,230.933539 142.809676,230.633537 C142.30134,230.333536 141.897177,229.891873 141.597176,229.308537 L131.897176,210.558537 C131.963843,211.141873 132.013842,211.721034 132.047176,212.296037 C132.080509,212.87104 132.097176,213.400201 132.097176,213.883537 L132.097176,234.833537 L124.647176,234.833537 L124.647176,198.408537 L131.097176,198.408537 C131.463844,198.408537 131.784674,198.41687 132.059676,198.433537 C132.334677,198.450204 132.580508,198.500203 132.797176,198.583537 C133.013843,198.666871 133.209675,198.796036 133.384676,198.971037 C133.559676,199.146038 133.730508,199.391869 133.897176,199.708537 L143.272176,218.183537 Z M183.851523,222.658537 L183.851523,234.833537 L175.401523,234.833537 L175.401523,198.408537 L188.251523,198.408537 C190.818203,198.408537 193.022347,198.712701 194.864023,199.321037 C196.705699,199.929374 198.22235,200.766865 199.414023,201.833537 C200.605696,202.900209 201.484854,204.15853 202.051523,205.608537 C202.618193,207.058544 202.901523,208.625195 202.901523,210.308537 C202.901523,212.125213 202.609859,213.791863 202.026523,215.308537 C201.443187,216.825211 200.551529,218.125198 199.351523,219.208537 C198.151517,220.291876 196.630699,221.137701 194.789023,221.746037 C192.947347,222.354374 190.768202,222.658537 188.251523,222.658537 L183.851523,222.658537 Z M183.851523,216.283537 L188.251523,216.283537 C190.451534,216.283537 192.034852,215.758542 193.001523,214.708537 C193.968195,213.658532 194.451523,212.19188 194.451523,210.308537 C194.451523,209.4752 194.326524,208.716874 194.076523,208.033537 C193.826522,207.3502 193.447359,206.762706 192.939023,206.271037 C192.430687,205.779368 191.789027,205.400205 191.014023,205.133537 C190.239019,204.866869 189.318195,204.733537 188.251523,204.733537 L183.851523,204.733537 L183.851523,216.283537 Z M219.555871,228.083537 L233.055871,228.083537 L233.055871,234.833537 L211.105871,234.833537 L211.105871,198.408537 L219.555871,198.408537 L219.555871,228.083537 Z M264.310218,198.408537 L264.310218,204.908537 L249.360218,204.908537 L249.360218,213.408537 L260.810218,213.408537 L260.810218,219.658537 L249.360218,219.658537 L249.360218,228.333537 L264.310218,228.333537 L264.310218,234.833537 L240.860218,234.833537 L240.860218,198.408537 L264.310218,198.408537 Z M299.364566,198.408537 L299.364566,205.108537 L289.114566,205.108537 L289.114566,234.833537 L280.664566,234.833537 L280.664566,205.108537 L270.414566,205.108537 L270.414566,198.408537 L299.364566,198.408537 Z M330.118913,198.408537 L330.118913,204.908537 L315.168913,204.908537 L315.168913,213.408537 L326.618913,213.408537 L326.618913,219.658537 L315.168913,219.658537 L315.168913,228.333537 L330.118913,228.333537 L330.118913,234.833537 L306.668913,234.833537 L306.668913,198.408537 L330.118913,198.408537 Z M371.773261,216.608537 C371.773261,219.241884 371.319099,221.671026 370.410761,223.896037 C369.502423,226.121048 368.223269,228.046029 366.573261,229.671037 C364.923252,231.296045 362.935772,232.562699 360.610761,233.471037 C358.285749,234.379375 355.706608,234.833537 352.873261,234.833537 L338.723261,234.833537 L338.723261,198.408537 L352.873261,198.408537 C355.706608,198.408537 358.285749,198.866866 360.610761,199.783537 C362.935772,200.700208 364.923252,201.966862 366.573261,203.583537 C368.223269,205.200212 369.502423,207.121026 370.410761,209.346037 C371.319099,211.571048 371.773261,213.991857 371.773261,216.608537 Z M363.123261,216.608537 C363.123261,214.808528 362.88993,213.183544 362.423261,211.733537 C361.956592,210.28353 361.285765,209.054376 360.410761,208.046037 C359.535756,207.037699 358.464934,206.262707 357.198261,205.721037 C355.931588,205.179368 354.489935,204.908537 352.873261,204.908537 L347.223261,204.908537 L347.223261,228.333537 L352.873261,228.333537 C354.489935,228.333537 355.931588,228.062707 357.198261,227.521037 C358.464934,226.979368 359.535756,226.204376 360.410761,225.196037 C361.285765,224.187699 361.956592,222.958544 362.423261,221.508537 C362.88993,220.05853 363.123261,218.425213 363.123261,216.608537 Z" 
                    id="COMPLETED" fill={colors.path4} fill-rule="evenodd" transform="translate(206.930871, 216.621037) rotate(-45.000000) translate(-206.930871, -216.621037) "/>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  };