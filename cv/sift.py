import numpy as np
import cv2
from PIL import Image  
import sys
from matplotlib import pyplot as plt


def preprocess(file):
    sImg = Image.open(file)  
    w, h = sImg.size
    if w > 1000 and h > 1000:
        dImg=sImg.resize((1000, 1000),Image.ANTIALIAS)
        dImg.save(file)
    elif w > 1000:
        dImg=sImg.resize((1000, h),Image.ANTIALIAS)
        dImg.save(file)
    elif h > 1000:
        dImg=sImg.resize((w, 1000),Image.ANTIALIAS)
        dImg.save(file)


def recognize_from_image(files=['2.jpeg', '1.jpeg']):
    origin_photo = files[0]
    MIN_MATCH_COUNT = 10
    img_colored = cv2.imread(files[0], cv2.IMREAD_COLOR)
    origin = cv2.imread(files[0], 0) # trainImage

    # Preprocess the pictures to accelerate 
    for item in files:
        preprocess(item)

    i = 1
    while i < len(files):
        img = cv2.imread(files[i], 0)  # queryImage
        
        # Initiate SIFT detector
        sift = cv2.xfeatures2d.SIFT_create()

        # find the keypoints and descriptors with SIFT
        kp1, des1 = sift.detectAndCompute(img,None)
        kp2, des2 = sift.detectAndCompute(origin,None)


        FLANN_INDEX_KDTREE = 0
        index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
        search_params = dict(checks=50)
        flann = cv2.FlannBasedMatcher(index_params, search_params)
        matches = flann.knnMatch(des1, des2, k=2)

        # store all the good matches as per Lowe's ratio test.
        good = []
        for m, n in matches:
            if m.distance < 0.7*n.distance:
                good.append(m)

        if len(good) > MIN_MATCH_COUNT:
            src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
            dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)

            M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
            matchesMask = mask.ravel().tolist()

            h, w = img.shape
            pts = np.float32([[0, 0], [0, h-1], [w-1, h-1], [w-1, 0]]).reshape(-1, 1, 2)
            dst = cv2.perspectiveTransform(pts, M)

            origin = cv2.polylines(img_colored, [np.int32(dst)], True, (255,0,0), 7, cv2.LINE_AA)

        else:
            print("Not enough matches are found - %d/%d" % (len(good),MIN_MATCH_COUNT))
            matchesMask = None

        i += 1

    plt.xticks([])
    plt.yticks([])
    plt.imshow(origin)
    plt.subplots_adjust(bottom = 0)
    plt.subplots_adjust(top = 1)
    plt.subplots_adjust(right = 1)
    plt.subplots_adjust(left = 0)
    plt.savefig('result.jpg')
    # draw_params = dict(matchColor=(0, 0, 0), # draw matches in green color
    #                    singlePointColor=None,
    #                    matchesMask=matchesMask, # draw only inliers
    #                    flags=2)


    # img3 = cv2.drawMatches(img1,kp1,img2,kp2,good,None,**draw_params)

    # plt.imshow(img3, 'gray'),plt.show()

if __name__ == '__main__':
    recognize_from_image()
    